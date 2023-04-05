import React from 'react';
import { useUIStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';

export const Fab: React.FC = () => {

  const { openDateModal } = useUIStore();
  const { setActiveCalendarEvent } = useCalendarStore();

  const handleClickNew: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setActiveCalendarEvent(null);
    openDateModal();
  }

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}> 
      <i className='fas fa-plus'></i>
    </button>
  )
}
