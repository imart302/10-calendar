import React, { useState } from 'react';
import { CalendarModal, Navbar } from '../components';
import { Calendar as ReactBigCalendar, EventPropGetter, View } from 'react-big-calendar';

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


export interface ICalendarSte {
  lastView: View,
}

export const Calendar = () => {

  const [ state, setState ] = useState<ICalendarSte>({
    lastView: 'agenda'
  })

  const eventStyleGetter : EventPropGetter<IMEvent> = (event: IMEvent, start: Date, end: Date, isSelected: boolean) => {

    return {
      style: {
        backgroundColor: '#3456ff',
      }
    }
  }

  const onSelectCalendar = (event: IMEvent, e: React.SyntheticEvent<HTMLElement, Event>) => {

  }

  const onDoubleClick = (event: IMEvent, e: React.SyntheticEvent<HTMLElement, Event>) => {

  }

  const onViewChange = (view: View) => {
    console.log(view);
  }

  return (
    <>
      <Navbar />

      <div> 
        <ReactBigCalendar
          culture="es"
          localizer={localizer}
          defaultView={state.lastView}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages = {messages}
          eventPropGetter = {eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onSelectEvent = {onSelectCalendar}
          onDoubleClickEvent = {onDoubleClick}
          onView = {onViewChange}
        />
      </div>

      <CalendarModal></CalendarModal>
    </>
  );
};
