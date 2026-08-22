import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { User } from '../../modules/auth/entities/user.entity';
import { Role } from '../../modules/auth/entities/role.entity';
import { Permission } from '../../modules/auth/entities/permission.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;
    if (!user || !user.roles) {
      return false;
    }

    // Extract all permissions from user's roles
    const userPermissions: string[] = [];
    user.roles.forEach((role: Role) => {
      if (role.permissions) {
        role.permissions.forEach((perm: Permission) => {
          userPermissions.push(`${perm.resource}:${perm.action}`);
        });
      }
    });

    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
