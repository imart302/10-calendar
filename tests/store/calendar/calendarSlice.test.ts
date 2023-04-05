import {
  calendarSlice,
  onSetActiveEvent,
  addNewEvent,
  setEvents,
  updateEvent,
  deleteEvent,
} from '../../../src/store';
import { ICalendarEvent } from '../../../src/types';
import { initialState, withEventsState, events } from '../../fixtures/calendar';

describe('Tests on calendarSlice reducers', () => {
  it('Should return the defaul state', () => {
    const initial = calendarSlice.getInitialState();

    expect(initial).toEqual(initialState);
  });

  it('Should set the active event', () => {
    const afterState = calendarSlice.reducer(
      withEventsState,
      onSetActiveEvent(events[0])
    );

    expect(afterState.activeEvent).toEqual(events[0]);
  });

  it('Should add a new event in the list of events', () => {
    const afterState = calendarSlice.reducer(
      initialState,
      addNewEvent(events[0])
    );

    expect(afterState.events).toContainEqual(events[0]);
  });

  it('Should set the events', () => {
    const afterState = calendarSlice.reducer(initialState, setEvents(events));

    expect(afterState.events).toEqual(events);
  });

  it('Should update the event', () => {
    const updEvent: ICalendarEvent = {
      ...events[0],
      title: 'new title',
    };

    const afterState = calendarSlice.reducer(
      withEventsState,
      updateEvent(updEvent)
    );

    expect(afterState.events).toContainEqual(updEvent);
  });

  it('Should delete the event from events', () => {
    const delEvent: ICalendarEvent = {
      ...events[0],
    };

    const afterState = calendarSlice.reducer(
      withEventsState,
      deleteEvent(delEvent)
    );

    expect(afterState.events).not.toContainEqual(delEvent);
  });
});
