import React from 'react';
import { IonButton } from '@ionic/react';

interface ButtonProps extends React.ComponentProps<typeof IonButton> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading, className = '', ...props }) => {
  return (
    <IonButton className={`min-w-[120px] ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? 'Loading...' : children}
    </IonButton>
  );
};
