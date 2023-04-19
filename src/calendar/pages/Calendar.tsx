import React, { useEffect, useState } from 'react';
import {
  EventPropGetter,
  Calendar as ReactBigCalendar,
  View,
} from 'react-big-calendar';
import { CalendarModal, Fab, Navbar } from '../components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, messages } from '../../helpers';
import { useCalendarStore, useUIStore } from '../../hooks';
import { ICalendarEventNotSerializable } from '../../types';
import { CalendarEventView } from '../components/CalendarEventView';

export interface ICalendarModalSte {
  lastView: View;
}

export const Calendar: React.FC = () => {
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
