import { useAuthStore } from '@/hooks';
import { resetLogin, useAppDispatch } from '@/store';
import React from 'react';

export const Navbar: React.FC = () => {
  const { auth } = useAuthStore();
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(resetLogin());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        {auth.user?.name}
      </span>

      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
