import React, { useEffect, useState } from 'react';
import { CalendarModal, Fab, Navbar } from '../components';
import {
  Calendar as ReactBigCalendar,
  EventPropGetter,
  View,
} from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, messages } from '../../helpers';
import { CalendarEventView } from '../components/CalendarEventView';
import { useUIStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { ICalendarEventNotSerializable } from '../../types';

export interface ICalendarModalSte {
  lastView: View;
}

export const Calendar = () => {
  const {
    calendarEvents,
    setActiveCalendarEvent,
    deserializedEvents,
    serializeEvents,
    fetchEvents,
  } = useCalendarStore();
  const { openDateModal } = useUIStore();

  const [state, setState] = useState<ICalendarModalSte>({
    lastView: 'month',
  });

  const eventStyleGetter: EventPropGetter<ICalendarEventNotSerializable> = (
    event: ICalendarEventNotSerializable,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    return {
      style: {
        backgroundColor: '#3456ff',
      },
    };
  };

  const onSelectCalendar = (
    event: ICalendarEventNotSerializable,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {};

  const onDoubleClick = (
    event: ICalendarEventNotSerializable,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    const [event2] = serializeEvents([event]);
    setActiveCalendarEvent(event2);
    openDateModal();
  };

  const onViewChange = (view: View) => {};

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div>
        <ReactBigCalendar
          culture="es"
          localizer={localizer}
          defaultView="month"
          events={deserializedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEventView,
          }}
          onSelectEvent={onSelectCalendar}
          onDoubleClickEvent={onDoubleClick}
          onView={onViewChange}
        />
      </div>

      <CalendarModal></CalendarModal>
      <Fab />
    </>
  );
};
