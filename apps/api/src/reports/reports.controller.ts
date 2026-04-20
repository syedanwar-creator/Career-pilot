import type { Request } from "express";

import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";

import type {
  ParentSharedReportResponse,
  SchoolGenerateReportResponse,
  SchoolLatestReportResponse,
  SchoolStudentDetailResponse,
  SchoolStudentsResponse,
  StudentGenerateReportResponse,
  StudentLatestReportResponse,
  StudentShareCreateResponse,
  StudentShareRevokeResponse
} from "@career-pilot/types";

import { SESSION_COOKIE_NAME } from "../auth/auth.service";
import { CreateReportShareDto } from "./dto/create-report-share.dto";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
    this.getLatestStudentReport = this.getLatestStudentReport.bind(this);
    this.generateStudentReport = this.generateStudentReport.bind(this);
    this.createStudentReportShare = this.createStudentReportShare.bind(this);
    this.revokeStudentReportShare = this.revokeStudentReportShare.bind(this);
    this.getParentSharedReport = this.getParentSharedReport.bind(this);
    this.getLatestSchoolReport = this.getLatestSchoolReport.bind(this);
    this.generateSchoolReport = this.generateSchoolReport.bind(this);
    this.getSchoolStudents = this.getSchoolStudents.bind(this);
    this.getSchoolStudentDetail = this.getSchoolStudentDetail.bind(this);
  }

  @Get("student/latest")
  getLatestStudentReport(@Req() request: Request): Promise<StudentLatestReportResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.getLatestStudentReport(token);
  }

  @Post("student/generate")
  generateStudentReport(@Req() request: Request): Promise<StudentGenerateReportResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.generateStudentReport(token);
  }

  @Post("student/latest/share")
  createStudentReportShare(
    @Req() request: Request,
    @Body() body: CreateReportShareDto
  ): Promise<StudentShareCreateResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.createStudentReportShare(token, body.expiresInDays);
  }

  @Post("student/shares/:shareId/revoke")
  revokeStudentReportShare(
    @Req() request: Request,
    @Param("shareId") shareId: string
  ): Promise<StudentShareRevokeResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.revokeStudentReportShare(token, shareId);
  }

  @Get("parent/:shareToken")
  getParentSharedReport(@Param("shareToken") shareToken: string): Promise<ParentSharedReportResponse> {
    return this.reportsService.getParentSharedReport(shareToken);
  }

  @Get("schools/:tenantId/latest")
  getLatestSchoolReport(
    @Req() request: Request,
    @Param("tenantId") tenantId: string
  ): Promise<SchoolLatestReportResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.getLatestSchoolReport(token, tenantId);
  }

  @Post("schools/:tenantId/generate")
  generateSchoolReport(
    @Req() request: Request,
    @Param("tenantId") tenantId: string
  ): Promise<SchoolGenerateReportResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.generateSchoolReport(token, tenantId);
  }

  @Get("schools/:tenantId/students")
  getSchoolStudents(
    @Req() request: Request,
    @Param("tenantId") tenantId: string,
    @Query("q") q?: string,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string
  ): Promise<SchoolStudentsResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.getSchoolStudents(token, tenantId, {
      q,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined
    });
  }

  @Get("schools/:tenantId/students/:studentId")
  getSchoolStudentDetail(
    @Req() request: Request,
    @Param("tenantId") tenantId: string,
    @Param("studentId") studentId: string
  ): Promise<SchoolStudentDetailResponse> {
    const token = request.cookies?.[SESSION_COOKIE_NAME];
    return this.reportsService.getSchoolStudentDetail(token, tenantId, studentId);
  }
}
