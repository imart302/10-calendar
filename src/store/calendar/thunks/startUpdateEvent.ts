import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { updateEvent } from '../../../api';
import {
  ICalendarEvent,
  ICalendarState,
} from '../../../types';
import { updateEventReducer } from '../reducers';

export const startUpdateEvent = createAsyncThunk<
  ICalendarEvent,
  ICalendarEvent
>('calendar/updateEvent', async (event) => {
  const newEvent = await updateEvent(event);
  return newEvent;
});

export const buildStartUpdateEvent = (
  builder: ActionReducerMapBuilder<ICalendarState>
) => {

  builder.addCase(startUpdateEvent.pending, (state) => {
    state.status = 'fetching';
  });

  builder.addCase(startUpdateEvent.fulfilled, updateEventReducer);

  builder.addCase(startUpdateEvent.rejected, (state, action) => {
    state.status = 'idle';
    state.error = action.error.message ?? 'Unknown error';
  });
};
