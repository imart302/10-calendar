import React from 'react';
import './SimpleSpinner.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const SimpleSpinner: React.FC<SpinnerProps> = ({ size = 24, color = 'gray' }) => {

  return <div className='simple-spinner'></div>;
};
