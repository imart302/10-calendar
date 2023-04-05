import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICalendarEvent, ICalendarState } from '../../types';

export const setEventsReducer: CaseReducer<
  ICalendarState,
  PayloadAction<ICalendarEvent[]>
> = (state, action) => {
  state.events = action.payload;
  state.activeEvent = null;
  state.status = 'idle';
};

export const addNewEventReducer: CaseReducer<
  ICalendarState,
  PayloadAction<ICalendarEvent>
> = (state, action) => {
  state.status = 'idle';
  state.events.push(action.payload);
};

export const updateEventReducer: CaseReducer<
  ICalendarState,
  PayloadAction<ICalendarEvent>
> = (state, action) => {
  state.status = 'idle';
  state.events = state.events.map((event) =>
    event._id === action.payload._id ? action.payload : event
  );
};

export const deleteEventReducer: CaseReducer<
  ICalendarState,
  PayloadAction<ICalendarEvent>
> = (state, action) => {
  state.status = 'idle';
  state.events = state.events.filter(        
    (event) => event._id !== action.payload._id
  );
};
