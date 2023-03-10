import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';

export const CalendarApp = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
