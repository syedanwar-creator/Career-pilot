import type { NextFunction, Request, Response } from "express";
import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

import { ObservabilityService } from "./observability.service";

type RateLimitRule = {
  id: string;
  methods?: string[];
  prefix: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_RULES: RateLimitRule[] = [
  { id: "auth-login", methods: ["POST"], prefix: "/v1/auth/login", limit: 10, windowMs: 60_000 },
  { id: "auth-register", methods: ["POST"], prefix: "/v1/auth/register", limit: 5, windowMs: 10 * 60_000 },
  { id: "auth-forgot-password", methods: ["POST"], prefix: "/v1/auth/forgot-password", limit: 5, windowMs: 60 * 60_000 },
  { id: "auth-refresh", methods: ["POST"], prefix: "/v1/auth/refresh", limit: 30, windowMs: 60_000 },
  { id: "recommendations-recompute", methods: ["POST"], prefix: "/v1/recommendations/recompute", limit: 10, windowMs: 10 * 60_000 },
  { id: "proof-session-start", methods: ["POST"], prefix: "/v1/assessments/proof-sessions", limit: 20, windowMs: 10 * 60_000 },
  { id: "student-report-generate", methods: ["POST"], prefix: "/v1/reports/student/generate", limit: 10, windowMs: 10 * 60_000 },
  { id: "student-report-share", methods: ["POST"], prefix: "/v1/reports/student/latest/share", limit: 10, windowMs: 10 * 60_000 },
  { id: "school-report-generate", methods: ["POST"], prefix: "/v1/reports/schools/", limit: 10, windowMs: 10 * 60_000 }
];

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly buckets = new Map<string, RateLimitBucket>();

  constructor(private readonly observabilityService: ObservabilityService) {
    this.use = this.use.bind(this);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const rule = this.matchRule(request);

    if (!rule) {
      next();
      return;
    }

    const key = `${rule.id}:${this.readClientKey(request)}`;
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, {
        count: 1,
        resetAt: now + rule.windowMs
      });
      this.attachHeaders(response, rule.limit, 1, now + rule.windowMs);
      next();
      return;
    }

    bucket.count += 1;
    this.attachHeaders(response, rule.limit, bucket.count, bucket.resetAt);

    if (bucket.count > rule.limit) {
      this.observabilityService.incrementRateLimited(rule.id);
      throw new HttpException("Rate limit exceeded.", HttpStatus.TOO_MANY_REQUESTS);
    }

    next();
  }

  private matchRule(request: Request): RateLimitRule | undefined {
    const method = request.method.toUpperCase();
    const url = (request.originalUrl || request.url).split("?")[0];

    return RATE_LIMIT_RULES.find((rule) => {
      if (rule.methods && !rule.methods.includes(method)) {
        return false;
      }

      if (rule.id === "school-report-generate") {
        return method === "POST" && /^\/v1\/reports\/schools\/[^/]+\/generate$/.test(url);
      }

      return url.startsWith(rule.prefix);
    });
  }

  private readClientKey(request: Request): string {
    const forwardedFor = request.headers["x-forwarded-for"];

    if (typeof forwardedFor === "string" && forwardedFor.trim()) {
      return forwardedFor.split(",")[0].trim();
    }

    return request.ip || request.socket.remoteAddress || "unknown";
  }

  private attachHeaders(response: Response, limit: number, count: number, resetAt: number): void {
    response.setHeader("x-ratelimit-limit", String(limit));
    response.setHeader("x-ratelimit-remaining", String(Math.max(0, limit - count)));
    response.setHeader("x-ratelimit-reset", String(Math.floor(resetAt / 1000)));
  }
}
