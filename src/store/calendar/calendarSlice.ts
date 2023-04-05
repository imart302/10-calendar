import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICalendarState, ICalendarEvent } from '../../types';
import {
  addNewEventReducer,
  setEventsReducer,
  updateEventReducer,
  deleteEventReducer,
} from './reducers';
import {
  buildStartCreateEvent,
  buildStartDeleteEvent,
  buildStartFetchEvents,
  buildStartUpdateEvent,
} from './thunks';

const initialState: ICalendarState = {
  events: [],
  activeEvent: null,
  error: null,
  status: 'idle',
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<ICalendarEvent | null>) => {
      state.activeEvent = action.payload;
    },

    addNewEvent: addNewEventReducer,
    setEvents: setEventsReducer,
    updateEvent: updateEventReducer,
    deleteEvent: deleteEventReducer,
  },

  extraReducers(builder) {
    buildStartCreateEvent(builder);
    buildStartFetchEvents(builder);
    buildStartUpdateEvent(builder);
    buildStartDeleteEvent(builder);
  },
});

export const calendarInitial = calendarSlice.getInitialState();
export const {
  onSetActiveEvent,
  addNewEvent,
  setEvents,
  updateEvent,
  deleteEvent,
} = calendarSlice.actions;
export const caledarReducer = calendarSlice.reducer;
