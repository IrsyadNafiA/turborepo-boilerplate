import React from 'react';
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react';

interface InputProps extends React.ComponentProps<typeof IonInput> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`mb-4 w-full ${className}`}>
      <IonItem className="rounded-lg">
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput {...props} />
      </IonItem>
      {error && (
        <IonText color="danger" className="text-sm pl-2 mt-1 block">
          {error}
        </IonText>
      )}
    </div>
  );
};
