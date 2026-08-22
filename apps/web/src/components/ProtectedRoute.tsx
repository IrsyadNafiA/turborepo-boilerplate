import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps extends RouteProps {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles,
  requiredPermissions,
  ...rest
}) => {
  const { token, user } = useAuthStore();

  if (!token || !user) {
    return <Redirect to="/login" />;
  }

  // Check roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = requiredRoles.some((role) => user.roles.map(r => r.name).includes(role));
    if (!hasRole) {
      return <Redirect to="/unauthorized" />;
    }
  }

  // Check permissions
  if (requiredPermissions && requiredPermissions.length > 0) {
    const userPermissions: string[] = [];
    user.roles.forEach(role => {
      if (role.permissions) {
        role.permissions.forEach(perm => {
          userPermissions.push(`${perm.resource}:${perm.action}`);
        });
      }
    });

    const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm));
    if (!hasPermission) {
      return <Redirect to="/unauthorized" />;
    }
  }

  return <Route {...rest} />;
};
