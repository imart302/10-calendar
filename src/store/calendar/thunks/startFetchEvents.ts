import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../../api';
import {
  ICalendarEvent,
  ICalendarState,
} from '../../../types';
import { setEventsReducer } from '../reducers';

export const startFetchEvents = createAsyncThunk<
  ICalendarEvent[]
>('calendar/fetchEvents', async () => {

  const events = await fetchEvents();
  return events.pagination.data;
});

export const buildStartFetchEvents = (
  builder: ActionReducerMapBuilder<ICalendarState>
) => {

  builder.addCase(startFetchEvents.pending, (state) => {
    state.status = 'fetching';
  });

  builder.addCase(startFetchEvents.fulfilled, setEventsReducer);

  builder.addCase(startFetchEvents.rejected, (state, action) => {
    state.status = 'idle';
    state.error = action.error.message ?? 'Unknown error';
  });
};
