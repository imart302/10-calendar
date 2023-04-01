import React from 'react';
import { useSelector } from 'react-redux';
import { resetLogin } from '../../store/auth';
import store, { RootState } from '../../store/store';

export const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = store.dispatch;
  
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
