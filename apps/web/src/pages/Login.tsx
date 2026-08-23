import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IonPage, IonContent, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import api from '../lib/axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useHistory();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data.data;
      setAuth(access_token, user);
      history.push('/dashboard');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
          <IonText color="primary">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
          </IonText>
          
          <form onSubmit={handleLogin} className="w-full">
            <Input 
              label="Email" 
              type="email" 
              value={email} 
              onIonChange={(e) => setEmail(e.detail.value!)} 
              required 
            />
            
            <Input 
              label="Password" 
              type="password" 
              value={password} 
              onIonChange={(e) => setPassword(e.detail.value!)} 
              required 
            />
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <Button type="submit" expand="block" isLoading={isLoading}>
              Sign In
            </Button>
            
            <div className="mt-4 text-center">
              <span className="text-gray-500">Don't have an account? </span>
              <a href="/register" className="text-blue-600 font-semibold" onClick={(e) => {
                e.preventDefault();
                history.push('/register');
              }}>
                Register
              </a>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
