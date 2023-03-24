import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';
import { ICalendarEventNew, ICalendarState } from '../../types';
import { ICalendarEvent } from '../../types';

const tempEvent : ICalendarEvent[] = [
  {
    _id: "AW",
    title: 'Cumpleaños nose',
    notes: 'Hay que comprar pastel',
    start: (new Date()).toISOString(),
    end: addHours(new Date(), 2).toISOString(),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Ivan',
    },
  },
]

const initialState : ICalendarState = {
  events: tempEvent,
  activeEvent: null,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<ICalendarEvent | null>) => {
      state.activeEvent = action.payload;
    },

    onAddNewEvent: (state, action: PayloadAction<ICalendarEventNew>) => {
      const event : ICalendarEvent = {
        ...action.payload,
        _id: Math.random().toString(2).slice(0, 6),
      }
      state.events.push(event);
    },

    onUpdateEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      const newevents = state.events.map((ev) => {
        if(ev._id === action.payload._id) return action.payload;
        else return ev;
      });

      state.events = newevents;
    },

    onDeleteEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      state.events = state.events.filter(ev => ev._id !== action.payload._id);
    },
  },

});


export const calendarInitState  = calendarSlice.getInitialState();
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions
export const caledarReducer =  calendarSlice.reducer