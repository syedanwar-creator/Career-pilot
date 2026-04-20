import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";

import { Injectable, UnauthorizedException, BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { MembershipRole, Prisma, UserAccountType } from "@prisma/client";

import type {
  AuthMeResponse,
  AuthSessionPayload,
  ForgotPasswordPayload,
  LoginPayload,
  PasswordResetResponse,
  RegisterPayload,
  ResetPasswordPayload
} from "@career-pilot/types";

import { PrismaService } from "../prisma/prisma.service";

export const SESSION_COOKIE_NAME = "career_pilot_session";
const sessionLifetimeMs = 7 * 24 * 60 * 60 * 1000;
const passwordResetLifetimeMs = 60 * 60 * 1000;

type SessionUserRecord = Prisma.UserGetPayload<{
  include: {
    memberships: {
      include: {
        tenant: true;
      };
    };
  };
}>;

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  getSessionCookieName(): string {
    return SESSION_COOKIE_NAME;
  }

  buildSessionCookie(token: string): string {
    const isProduction = process.env.NODE_ENV === "production";
    const securePart = isProduction ? "; Secure" : "";

    return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(
      sessionLifetimeMs / 1000
    )}${securePart}`;
  }

  buildLogoutCookie(): string {
    return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  }

  async register(payload: RegisterPayload, userAgent?: string, ipAddress?: string): Promise<{ token: string; session: AuthSessionPayload }> {
    const email = payload.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ConflictException("An account with this email already exists.");
    }

    if (payload.accountType === "school_admin" && (!payload.schoolName || !payload.tenantSlug)) {
      throw new BadRequestException("School name and tenant slug are required for school admin registration.");
    }

    if (payload.accountType === "school_student" && !payload.tenantSlug) {
      throw new BadRequestException("Tenant slug is required for school student registration.");
    }

    const result = await this.prisma.$transaction(async (tx) => {
      let tenantId: string | null = null;

      if (payload.accountType === "school_admin") {
        const slug = payload.tenantSlug!.trim().toLowerCase();
        const existingTenant = await tx.tenant.findUnique({
          where: { slug }
        });

        if (existingTenant) {
          throw new ConflictException("That tenant slug is already in use.");
        }

        const tenant = await tx.tenant.create({
          data: {
            name: payload.schoolName!.trim(),
            slug
          }
        });

        tenantId = tenant.id;
      }

      if (payload.accountType === "school_student") {
        const tenant = await tx.tenant.findUnique({
          where: { slug: payload.tenantSlug!.trim().toLowerCase() }
        });

        if (!tenant) {
          throw new NotFoundException("School tenant not found.");
        }

        tenantId = tenant.id;
      }

      const user = await tx.user.create({
        data: {
          email,
          fullName: payload.fullName.trim(),
          passwordHash: this.hashPassword(payload.password),
          accountType: tenantId ? UserAccountType.tenant_member : UserAccountType.individual
        }
      });

      if (tenantId) {
        await tx.tenantMembership.create({
          data: {
            tenantId,
            userId: user.id,
            role: payload.accountType === "school_admin" ? MembershipRole.school_admin : MembershipRole.student
          }
        });
      }

      await tx.auditLog.create({
        data: {
          actorUserId: user.id,
          tenantId,
          action: "auth.register",
          entityType: "user",
          entityId: user.id,
          metadata: {
            accountType: payload.accountType
          },
          ipAddress
        }
      });

      const session = await tx.session.create({
        data: {
          userId: user.id,
          refreshTokenHash: "",
          userAgent,
          ipAddress,
          expiresAt: new Date(Date.now() + sessionLifetimeMs)
        }
      });

      const token = this.generateOpaqueToken();
      await tx.session.update({
        where: { id: session.id },
        data: {
          refreshTokenHash: this.hashOpaqueToken(token)
        }
      });

      const hydratedUser = await tx.user.findUniqueOrThrow({
        where: { id: user.id },
        include: {
          memberships: {
            include: {
              tenant: true
            }
          }
        }
      });

      return {
        token,
        session: this.toSessionPayload(hydratedUser)
      };
    });

    return result;
  }

  async login(payload: LoginPayload, userAgent?: string, ipAddress?: string): Promise<{ token: string; session: AuthSessionPayload }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email.trim().toLowerCase()
      },
      include: {
        memberships: {
          include: {
            tenant: true
          }
        }
      }
    });

    if (!user || !this.verifyPassword(payload.password, user.passwordHash)) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const token = this.generateOpaqueToken();

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: this.hashOpaqueToken(token),
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + sessionLifetimeMs)
      }
    });

    await this.prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        tenantId: user.memberships[0]?.tenantId || null,
        action: "auth.login",
        entityType: "session",
        metadata: {
          email: user.email
        },
        ipAddress
      }
    });

    return {
      token,
      session: this.toSessionPayload(user)
    };
  }

  async refresh(token: string | undefined): Promise<{ token: string; session: AuthSessionPayload } | null> {
    const sessionRecord = await this.resolveSession(token);

    if (!sessionRecord) {
      return null;
    }

    const nextToken = this.generateOpaqueToken();
    await this.prisma.session.update({
      where: {
        id: sessionRecord.id
      },
      data: {
        refreshTokenHash: this.hashOpaqueToken(nextToken),
        expiresAt: new Date(Date.now() + sessionLifetimeMs)
      }
    });

    return {
      token: nextToken,
      session: this.toSessionPayload(sessionRecord.user)
    };
  }

  async logout(token: string | undefined): Promise<void> {
    if (!token) {
      return;
    }

    const tokenHash = this.hashOpaqueToken(token);

    await this.prisma.session.updateMany({
      where: {
        refreshTokenHash: tokenHash,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });
  }

  async requestPasswordReset(payload: ForgotPasswordPayload): Promise<PasswordResetResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email.trim().toLowerCase()
      }
    });

    if (!user) {
      return {
        ok: true,
        message: "If the account exists, a reset link has been prepared."
      };
    }

    const rawToken = this.generateOpaqueToken();
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashOpaqueToken(rawToken),
        expiresAt: new Date(Date.now() + passwordResetLifetimeMs)
      }
    });

    await this.prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: "auth.password_reset_requested",
        entityType: "password_reset_token",
        entityId: user.id
      }
    });

    return {
      ok: true,
      message: "If the account exists, a reset link has been prepared.",
      resetToken: process.env.NODE_ENV === "production" ? undefined : rawToken
    };
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<PasswordResetResponse> {
    const tokenHash = this.hashOpaqueToken(payload.token);
    const resetToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        consumedAt: null,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!resetToken) {
      throw new UnauthorizedException("Reset token is invalid or expired.");
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: resetToken.userId
        },
        data: {
          passwordHash: this.hashPassword(payload.newPassword)
        }
      });

      await tx.passwordResetToken.update({
        where: {
          id: resetToken.id
        },
        data: {
          consumedAt: new Date()
        }
      });

      await tx.session.updateMany({
        where: {
          userId: resetToken.userId,
          revokedAt: null
        },
        data: {
          revokedAt: new Date()
        }
      });
    });

    return {
      ok: true,
      message: "Password updated successfully."
    };
  }

  async getMe(token: string | undefined): Promise<AuthMeResponse> {
    const session = await this.resolveSession(token);

    if (!session) {
      return {
        authenticated: false,
        session: null
      };
    }

    return {
      authenticated: true,
      session: this.toSessionPayload(session.user)
    };
  }

  async getAuthenticatedSession(token: string | undefined): Promise<Prisma.SessionGetPayload<{
    include: {
      user: {
        include: {
          memberships: {
            include: {
              tenant: true;
            };
          };
        };
      };
    };
  }> | null> {
    return this.resolveSession(token);
  }

  private async resolveSession(token: string | undefined): Promise<Prisma.SessionGetPayload<{
    include: {
      user: {
        include: {
          memberships: {
            include: {
              tenant: true;
            };
          };
        };
      };
    };
  }> | null> {
    if (!token) {
      return null;
    }

    const tokenHash = this.hashOpaqueToken(token);
    const session = await this.prisma.session.findFirst({
      where: {
        refreshTokenHash: tokenHash,
        revokedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: {
          include: {
            memberships: {
              include: {
                tenant: true
              }
            }
          }
        }
      }
    });

    return session;
  }

  private toSessionPayload(user: SessionUserRecord): AuthSessionPayload {
    const activeMembership = user.memberships.find((membership) => membership.status === "active") || null;

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        accountType: user.accountType,
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      activeMembership: activeMembership
        ? {
            id: activeMembership.id,
            role: activeMembership.role,
            status: activeMembership.status,
            tenant: {
              id: activeMembership.tenant.id,
              name: activeMembership.tenant.name,
              slug: activeMembership.tenant.slug,
              type: activeMembership.tenant.type,
              status: activeMembership.tenant.status
            }
          }
        : null,
      permissions: this.getPermissions(activeMembership?.role || null)
    };
  }

  toTenantSummary(user: SessionUserRecord): NonNullable<AuthSessionPayload["activeMembership"]>["tenant"] | null {
    const activeMembership = user.memberships.find((membership) => membership.status === "active") || null;

    if (!activeMembership) {
      return null;
    }

    return {
      id: activeMembership.tenant.id,
      name: activeMembership.tenant.name,
      slug: activeMembership.tenant.slug,
      type: activeMembership.tenant.type,
      status: activeMembership.tenant.status
    };
  }

  private getPermissions(role: MembershipRole | null): string[] {
    if (role === MembershipRole.school_admin) {
      return ["school:read", "school:write", "student:read", "student:write"];
    }

    if (role === MembershipRole.student) {
      return ["profile:read", "profile:write"];
    }

    return ["self:read"];
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(":");

    if (!salt || !hash) {
      return false;
    }

    const candidate = scryptSync(password, salt, 64);
    const target = Buffer.from(hash, "hex");

    return target.length === candidate.length && timingSafeEqual(target, candidate);
  }

  private generateOpaqueToken(): string {
    return randomBytes(32).toString("base64url");
  }

  private hashOpaqueToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
