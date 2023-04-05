import { formatISO, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  onSetActiveEvent,
  startCreateEvent,
  startDeleteEvent,
  startFetchEvents,
  startUpdateEvent,
  useAppDispatch,
  useAppSelector,
} from '../store';
import {
  ICalendarEvent,
  ICalendarEventNew,
  ICalendarEventNotSerializable,
} from '../types';

export const useCalendarStore = () => {
  const { activeEvent, events: calendarEvents } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  const [deserializedEvents, setDeserializedEvents] = useState<
    ICalendarEventNotSerializable[]
  >([]);


  const setActiveCalendarEvent = (event: ICalendarEvent | null) => {
    dispatch(onSetActiveEvent(event));
  };

  const createNewEvent = (event: ICalendarEventNew) => {
    dispatch(startCreateEvent(event));
  };

  const fetchEvents = () => {
    dispatch(startFetchEvents());
  };

  const updateEvent = (event: ICalendarEvent) => {
    dispatch(startUpdateEvent(event));
  };

  const deleteEvent = (event: ICalendarEvent) => {
    dispatch(startDeleteEvent(event));
  };

  const serializeEvents = (
    calendarEvents: ICalendarEventNotSerializable[]
  ): ICalendarEvent[] => {
    return calendarEvents.map((ev) => {
      return {
        ...ev,
        start: formatISO(ev.start),
        end: formatISO(ev.end),
      };
    });
  };

  const deserializeEvents = (
    calendarEvents: ICalendarEvent[]
  ): ICalendarEventNotSerializable[] => {
    return calendarEvents.map((ev) => {
      return {
        ...ev,
        start: parseISO(ev.start),
        end: parseISO(ev.end),
      };
    });
  };

  useEffect(() => {
    setDeserializedEvents(
      calendarEvents.map((ev) => {
        return {
          ...ev,
          start: parseISO(ev.start),
          end: parseISO(ev.end),
        };
      })
    );
  }, [calendarEvents]);

  return {
    activeEvent,
    calendarEvents,
    deserializedEvents,
    setActiveCalendarEvent,
    serializeEvents,
    deserializeEvents,
    createNewEvent,
    fetchEvents,
    updateEvent,
    deleteEvent,
  };
};
