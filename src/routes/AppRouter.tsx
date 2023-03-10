import React from 'react'
import { Route } from 'react-router';
import { Navigate, Routes } from 'react-router-dom'
import { Login } from '../auth';
import { Calendar } from '../calendar';

export const AppRouter = () => {
  
  const authStatus:string = 'auth';

  return (
    <Routes>
      {
        (authStatus === 'not-auth') 
          ? <Route path='/auth/*' element={<Login />} />
          : <Route path='/*' element={<Calendar />} />
      }


      <Route path='/*' element={ <Navigate to='/auth/login' /> } />
    
    </Routes>
  )
}
