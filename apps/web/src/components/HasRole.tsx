import React from 'react';
import { useAuthStore } from '../store/authStore';

interface HasRoleProps {
  roles: string[];
  children: React.ReactNode;
}

export const HasRole: React.FC<HasRoleProps> = ({ roles, children }) => {
  const { user } = useAuthStore();

  if (!user || !user.roles) {
    return null;
  }

  const hasRole = roles.some((role) => user.roles.map(r => r.name).includes(role));

  if (!hasRole) {
    return null;
  }

  return <>{children}</>;
};
