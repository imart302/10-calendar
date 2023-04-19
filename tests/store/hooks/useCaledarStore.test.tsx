import { renderHook, act, waitFor } from '@testing-library/react';
import { useCalendarStore } from '../../../src/hooks';
import { Provider } from 'react-redux';
import { createTestStore } from '../../fixtures/createTestStore';
import React from 'react';
import { events, withEventsState } from '../../fixtures/calendar';
import { ICalendarEvent, ICalendarEventNew } from '../../../src/types';
import {
  createNewEvent as createNewEventApi,
  fetchEvents as fetchEventsApi,
  updateEvent as updateEventApi,
  deleteEvent as deleteEventApi,
} from '../../../src/api';
import { vi } from 'vitest';

vi.mock('../../../src/api', () => {
  return {
    createNewEvent: vi.fn(() => {}),
    fetchEvents: vi.fn(() => {}),
    updateEvent: vi.fn(() => {}),
    deleteEvent: vi.fn(() => {})
  };
});

describe('Tests on useCalendarStore Hook', () => {
  let mockStore = createTestStore();
  const nevent: ICalendarEventNew = {
    bgColor: '#dadada',
    end: new Date().toISOString(),
    start: new Date().toISOString(),
    notes: '',
    title: 'title',
    user: {
      _id: 'id',
      name: 'name',
    },
  };

  const newEvent: ICalendarEvent = {
    ...nevent,
    _id: '123',
  };

  beforeEach(() => {
    mockStore = createTestStore();
  });

  it('Should set the default state', () => {
    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      activeEvent: null,
      calendarEvents: [],
      deserializedEvents: [],
      setActiveCalendarEvent: expect.any(Function),
      serializeEvents: expect.any(Function),
      deserializeEvents: expect.any(Function),
      createNewEvent: expect.any(Function),
      fetchEvents: expect.any(Function),
      updateEvent: expect.any(Function),
      deleteEvent: expect.any(Function),
    });
  });

  it('Should set the active event in activeEvent', () => {
    mockStore = createTestStore(undefined, withEventsState);
    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { setActiveCalendarEvent } = result.current;

    act(() => {
      setActiveCalendarEvent(events[0]);
    });

    expect(result.current.activeEvent).toEqual(events[0]);
  });

  it('Should create and append the new event in calendarEvents and deserializedEvents', async () => {
    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    vi.mocked(createNewEventApi).mockResolvedValue(newEvent);
    const { createNewEvent, deserializeEvents } = result.current;

    await act(async () => {
      createNewEvent(nevent);
    });

    expect(result.current.calendarEvents).toEqual([newEvent]);
    expect(result.current.deserializedEvents).toEqual(
      deserializeEvents([newEvent])
    );
  });

  it('Should set the events from DB when call fetchEvents en set deserializedEvents too', async () => {
    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    vi.mocked(fetchEventsApi).mockResolvedValue({
      ok: true,
      pagination: {
        count: events.length,
        data: events,
        offset: 0,
        page: 0,
        remaining: 0,
      },
    });

    const { fetchEvents, deserializeEvents } = result.current;

    await act(async () => {
      fetchEvents();
    });

    expect(result.current.calendarEvents).toEqual(events);
    expect(result.current.deserializedEvents).toEqual(
      deserializeEvents(events)
    );
  });

  it('Should update the event', async () => {
    mockStore = createTestStore(undefined, withEventsState);

    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const updtatedEvent: ICalendarEvent = {
      ...events[0],
      title: 'New title',
      bgColor: '#fcfcfc',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    };

    vi.mocked(updateEventApi).mockResolvedValue(updtatedEvent);

    const { updateEvent } = result.current;

    await act(async () => {
      updateEvent(updtatedEvent);
    });

    expect(result.current.calendarEvents).toContainEqual(updtatedEvent);
  });

  it('Should delete the event', async () => {
    mockStore = createTestStore(undefined, withEventsState);

    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}> {children} </Provider>
      ),
    });

    const del = {
      ...events[0]
    }

    vi.mocked(deleteEventApi).mockResolvedValue({
      deleted: 1,
      ok: true,
    });

    const { deleteEvent } = result.current;

    act(() => {
      deleteEvent(del);
    });

    await waitFor(() => {
      expect(result.current.calendarEvents).not.toContainEqual(del);
    });

    expect(result.current.calendarEvents).not.toContainEqual(del);

  });

});
