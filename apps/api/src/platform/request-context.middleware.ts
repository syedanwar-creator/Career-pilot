import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";

import { ObservabilityService } from "./observability.service";

type RequestWithContext = Request & {
  requestId?: string;
};

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly observabilityService: ObservabilityService) {
    this.use = this.use.bind(this);
  }

  use(request: RequestWithContext, response: Response, next: NextFunction): void {
    const startedAt = Date.now();
    const requestId = this.readRequestId(request);

    request.requestId = requestId;
    response.setHeader("x-request-id", requestId);

    response.on("finish", () => {
      const durationMs = Date.now() - startedAt;
      const route = this.normalizeRoute(request.originalUrl || request.url);

      this.observabilityService.observeRequest(request.method, route, response.statusCode, durationMs);
      console.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level: "info",
          message: "http_request_completed",
          requestId,
          method: request.method,
          route,
          statusCode: response.statusCode,
          durationMs,
          ipAddress: this.readIpAddress(request),
          userAgent: request.headers["user-agent"] || null
        })
      );
    });

    next();
  }

  private readRequestId(request: Request): string {
    const value = request.headers["x-request-id"];
    return typeof value === "string" && value.trim() ? value.trim() : randomUUID();
  }

  private readIpAddress(request: Request): string {
    const forwardedFor = request.headers["x-forwarded-for"];

    if (typeof forwardedFor === "string" && forwardedFor.trim()) {
      return forwardedFor.split(",")[0].trim();
    }

    return request.ip || request.socket.remoteAddress || "unknown";
  }

  private normalizeRoute(url: string): string {
    return url.split("?")[0] || "/";
  }
}
