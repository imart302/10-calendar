import React from 'react';
import { Navbar } from '../components';
import { Calendar as ReactBigCalendar, EventPropGetter } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer, messages } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';

export interface IMEvent {
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor: string,
  user: {
    _id: string,
    name: string,
  },
}

const events : IMEvent[] = [
  {
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Ivan',
    },
  },
];


export const Calendar = () => {

  const eventStyleGetter : EventPropGetter<IMEvent> = (event: IMEvent, start: Date, end: Date, isSelected: boolean) => {
    console.log(event, start, end, isSelected);
    return {
      style: {
        backgroundColor: '#3456ff',
      }
    }
  }

  return (
    <>
      <Navbar />

      <div> 
        <ReactBigCalendar
          culture="es"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages = {messages}
          eventPropGetter = {eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
        />
      </div>
    </>
  );
};
