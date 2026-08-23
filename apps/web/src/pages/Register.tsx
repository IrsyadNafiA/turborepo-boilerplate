import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IonPage, IonContent, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../lib/axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/register', { email, password });
      setSuccess('Registration successful! Please login.');
      setTimeout(() => history.push('/login'), 2000);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
          <IonText color="primary">
            <h1 className="text-3xl font-bold mb-8">Register</h1>
          </IonText>
          
          <form onSubmit={handleRegister} className="w-full">
            <Input 
              label="Email" 
              type="email" 
              value={email} 
              onIonChange={(e) => setEmail(e.detail.value!)} 
              required 
            />
            
            <Input 
              label="Password (min 6 chars)" 
              type="password" 
              value={password} 
              onIonChange={(e) => setPassword(e.detail.value!)} 
              required 
            />
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            
            <Button type="submit" expand="block" isLoading={isLoading} color="secondary">
              Sign Up
            </Button>
            
            <div className="mt-4 text-center">
              <span className="text-gray-500">Already have an account? </span>
              <a href="/login" className="text-blue-600 font-semibold" onClick={(e) => {
                e.preventDefault();
                history.push('/login');
              }}>
                Login
              </a>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
