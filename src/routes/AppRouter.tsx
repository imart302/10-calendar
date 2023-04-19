import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { Navigate, Routes } from 'react-router-dom';
import { Login } from '../auth';
import { Calendar } from '../calendar';
import { useAuthStore } from '../hooks/useAuthStore';
import { SimpleSpinner } from '@/ui/components/SimpleSpinner';

export const AppRouter = () => {
  const { checkAuthToken, auth: authStatus } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if(authStatus.state === 'renew') {
    return (
      <SimpleSpinner />
    )
  }

  return (
    <Routes>
      {authStatus.state === 'auth' ? (
        <>
          <Route path='/' element={<Calendar />}/>
          <Route path="/*" element={ <Navigate to={'/'}/>} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<Login />} />
          <Route path="/*" element={ <Navigate to={'/auth/login'}/>} />
        </>
      )}
    </Routes>
  );
};
