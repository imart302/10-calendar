import { formatISO, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { startCreateEvent, startDeleteEvent, startUpdateEvent } from '../store';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { startFetchEvents } from '../store/calendar/thunks/startFetchEvents';
import store, { RootState } from '../store/store'
import { ICalendarEvent, ICalendarEventNotSerializable, ICalendarEventNew } from '../types';

export const useCalendarStore = () => {
  
  const {activeEvent, events: calendarEvents} = useSelector((state: RootState) => state.calendar);
  const [ deserializedEvents, setDeserializedEvents ] = useState<ICalendarEventNotSerializable[]>([]);

  const dispatch = store.dispatch;
  
  const setActiveCalendarEvent = (event: ICalendarEvent | null) => {
    dispatch(onSetActiveEvent(event));
  }

  const startSavingNewEvent = async (event: ICalendarEventNew) => {
    dispatch(onAddNewEvent(event));
  }

  const startUpdateCalendarEvent = async (event: ICalendarEvent) => {
    dispatch(onUpdateEvent(event));
  }

  const startDeleteCalendarEvent = async (event: ICalendarEvent) => {
    dispatch(onDeleteEvent(event));
  }

  const createNewEvent = (event: ICalendarEventNew) => {
    dispatch(startCreateEvent(event));
  }

  const fetchEvents = () => {
    dispatch(startFetchEvents());
  };

  const updateEvent = (event: ICalendarEvent) => {
    dispatch(startUpdateEvent(event));
  }

  const deleteEvent = (event: ICalendarEvent) => {
    dispatch(startDeleteEvent(event));
  }

  const serializeEvents = (calendarEvents: ICalendarEventNotSerializable[]): ICalendarEvent[] => {
    return calendarEvents.map(ev => {
      return {
        ...ev,
        start: formatISO(ev.start),
        end: formatISO(ev.end),
      }
    });
  }

  const deserializeEvents = (calendarEvents: ICalendarEvent[]): ICalendarEventNotSerializable[] => {
    return calendarEvents.map(ev => {
      return {
        ...ev,
        start: parseISO(ev.start),
        end: parseISO(ev.end),
      }
    });
  }
  
  useEffect(() => {
    setDeserializedEvents(calendarEvents.map(ev => {
      return {
        ...ev,
        start: parseISO(ev.start),
        end: parseISO(ev.end),
      }
    }));
  }, [calendarEvents]);
  
  return {
    activeEvent,
    calendarEvents,
    deserializedEvents,
    setActiveCalendarEvent,
    startSavingNewEvent,
    startUpdateCalendarEvent,
    startDeleteCalendarEvent,
    serializeEvents,
    deserializeEvents,
    createNewEvent,
    fetchEvents,
    updateEvent,
    deleteEvent,
  }
}
