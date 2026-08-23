import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { HasRole } from '../components/HasRole';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="max-w-2xl mx-auto mt-8">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome, {user?.email}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p className="mb-4">You have successfully logged in.</p>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Your Roles:</h3>
                <ul className="list-disc pl-5">
                  {user?.roles.map(role => (
                    <li key={role.name} className="text-blue-600">{role.name}</li>
                  ))}
                </ul>
              </div>

              <HasRole roles={['ADMIN']}>
                <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6">
                  <h3 className="text-red-700 font-bold">Admin Panel Area</h3>
                  <p className="text-sm text-red-600">This content is only visible to users with the ADMIN role.</p>
                </div>
              </HasRole>

              <Button onClick={logout} color="danger">
                Logout
              </Button>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
