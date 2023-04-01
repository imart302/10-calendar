import {
  ICalendarDeleteEvent,
  ICalendarEvent,
  ICalendarEventsPaginated,
  IEventCreatePayload,
} from '../types';
import { calendarApi } from './calendarApi';

export const createNewEvent = async (
  event: IEventCreatePayload
): Promise<ICalendarEvent> => {
  const path = '/events/';

  const resp = await calendarApi.post(path, event);
  const data = resp.data.event as unknown as ICalendarEvent;
  return data;
};

export const fetchEvents = async () => {
  const path = '/events/';

  const resp = await calendarApi.get(path);
  const body = resp.data as ICalendarEventsPaginated;

  return body;
};

export const updateEvent = async (event: ICalendarEvent) => {
  const path = `/events/${event._id}`;

  const payload: IEventCreatePayload = {
    ...event,
  };

  const resp = await calendarApi.put(path, payload);
  const body = resp.data.event as unknown as ICalendarEvent;

  return body;
};

export const deleteEvent = async (event: ICalendarEvent) => {
  const path = `/events/${event._id}`;

  const resp = await calendarApi.delete(path);
  console.log(resp);
  const body = resp.data.event as unknown as ICalendarDeleteEvent;

  return body;
}
