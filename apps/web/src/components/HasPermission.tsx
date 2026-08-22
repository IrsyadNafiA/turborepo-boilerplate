import React from 'react';
import { useAuthStore } from '../store/authStore';

interface HasPermissionProps {
  permissions: string[];
  children: React.ReactNode;
}

export const HasPermission: React.FC<HasPermissionProps> = ({ permissions, children }) => {
  const { user } = useAuthStore();

  if (!user || !user.roles) {
    return null;
  }

  const userPermissions: string[] = [];
  user.roles.forEach(role => {
    if (role.permissions) {
      role.permissions.forEach(perm => {
        userPermissions.push(`${perm.resource}:${perm.action}`);
      });
    }
  });

  const hasPermission = permissions.some((perm) => userPermissions.includes(perm));

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};
