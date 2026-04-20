import { Controller, Get } from "@nestjs/common";

import type { HealthResponse } from "@career-pilot/types";

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      ok: true,
      service: "career-pilot-api"
    };
  }
}
