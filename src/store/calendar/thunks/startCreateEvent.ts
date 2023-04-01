import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { createNewEvent } from '../../../api';
import {
  ICalendarEvent,
  ICalendarEventNew,
  ICalendarState,
} from '../../../types';
import { addNewEventReducer } from '../reducers';

export const startCreateEvent = createAsyncThunk<
  ICalendarEvent,
  ICalendarEventNew
>('calendar/newEvent', async (event) => {
  const newEvent = await createNewEvent(event);
  return newEvent;
});

export const buildStartCreateEvent = (
  builder: ActionReducerMapBuilder<ICalendarState>
) => {

  builder.addCase(startCreateEvent.pending, (state) => {
    state.status = 'creating';
  });

  builder.addCase(startCreateEvent.fulfilled, addNewEventReducer);

  builder.addCase(startCreateEvent.rejected, (state, action) => {
    state.status = 'idle';
    state.error = action.error.message ?? 'Unknown error';
  });
};
