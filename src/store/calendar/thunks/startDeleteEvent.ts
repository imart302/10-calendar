import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteEvent } from '../../../api';
import {
  ICalendarEvent,
  ICalendarState,
} from '../../../types';
import { deleteEventReducer } from '../reducers';

export const startDeleteEvent = createAsyncThunk<
  ICalendarEvent,
  ICalendarEvent
>('calendar/deleteEvent', async (event) => {
  const del = await deleteEvent(event);
  return event;
});

export const buildStartDeleteEvent = (
  builder: ActionReducerMapBuilder<ICalendarState>
) => {

  builder.addCase(startDeleteEvent.pending, (state) => {
    state.status = 'fetching';
  });

  builder.addCase(startDeleteEvent.fulfilled, deleteEventReducer);

  builder.addCase(startDeleteEvent.rejected, (state, action) => {
    state.status = 'idle';
    state.error = action.error.message ?? 'Unknown error';
  });
};
