import { ICalendarEvent, ICalendarState } from "../../src/types";

export const events : ICalendarEvent[] = [
  {
    _id: '1',
    bgColor: '#fafa',
    end: (new Date()).toISOString(),
    notes: '',
    start: (new Date()).toISOString(),
    title: '',
    user: {
      _id: 'id',
      name: 'name'
    }
  },
  {
    _id: '2',
    bgColor: '#fafa',
    end: (new Date()).toISOString(),
    notes: '',
    start: (new Date()).toISOString(),
    title: '',
    user: {
      _id: 'id',
      name: 'name'
    }
  },
  {
    _id: '3',
    bgColor: '#fafa',
    end: (new Date()).toISOString(),
    notes: '',
    start: (new Date()).toISOString(),
    title: '',
    user: {
      _id: 'id',
      name: 'name'
    }
  }
]

export const initialState : ICalendarState = {
  activeEvent: null,
  error: null,
  events: [],
  status: 'idle',
}

export const withEventsState : ICalendarState = {
  activeEvent: null,
  error: null,
  events: events,
  status: 'idle',
}


