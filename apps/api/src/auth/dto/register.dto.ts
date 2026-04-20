import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

import type { RegisterAccountType } from "@career-pilot/types";

const registerAccountTypes: RegisterAccountType[] = ["individual", "school_admin", "school_student"];

export class RegisterDto {
  @IsEnum(registerAccountTypes)
  accountType!: RegisterAccountType;

  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  schoolName?: string;

  @IsOptional()
  @IsString()
  tenantSlug?: string;
}
