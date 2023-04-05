import { startCreateEvent } from '../../../../src/store/calendar/thunks';
import { ICalendarEvent, ICalendarEventNew } from '../../../../src/types';
import { createTestStore } from '../../../fixtures/createTestStore';
import { vi } from 'vitest';
import { createNewEvent } from '../../../../src/api/events';

vi.mock('../../../../src/api/events');

describe('Tests on startCreateEvent thunk', () => {

  let store = createTestStore();
  const eventNew: ICalendarEventNew = {
    bgColor: '#fafafa',
    end: (new Date()).toISOString(),
    start: (new Date()).toISOString(),
    notes: 'notes',
    title: 'title',
    user: {
      _id: 'id',
      name: 'name'
    }
  }

  beforeEach(() => {
    store = createTestStore();
  });

  it('Should set the calendar.status to creating when thunk is pending', async () => {
    
    vi.mocked(createNewEvent).mockImplementation(() => {
      return new Promise<ICalendarEvent>(() => {});
    });

    const initialState = store.getState();

    const prom = store.dispatch(startCreateEvent(eventNew));

    const afterState = store.getState();

    expect(initialState.calendar.status).toEqual('idle');
    expect(afterState.calendar.status).toEqual('creating');

    prom.abort();

  });

  it('Should add the new event calendar in calendar.events and restore de status to idle', async () => {

    const mockevent = {
      _id: 'mockid',
      bgColor: '#fafafa',
      end: (new Date()).toISOString(),
      notes: 'notes',
      start: (new Date()).toISOString(),
      title: 'title',
      user: {
        _id: 'mockid',
        name: 'mockname',
      }
    }

    vi.mocked(createNewEvent).mockResolvedValue(mockevent);

    const initialState = store.getState();

    await store.dispatch(startCreateEvent(eventNew));

    const afterState = store.getState();

    expect(initialState.calendar.status).toBe('idle');
    expect(afterState.calendar.events).toContainEqual(mockevent);

  });

  it('Should set the error in calendar.error when thunk is rejected', async () => {

    const rejectData = {
      message: 'Mock Error',
    }

    vi.mocked(createNewEvent).mockImplementation(() => {
      return Promise.reject(rejectData);
    });

    const initialState = store.getState();
    await store.dispatch(startCreateEvent(eventNew));
    const afterState = store.getState();

    expect(initialState.calendar.status).toBe('idle');
    expect(afterState.calendar.error).toEqual(rejectData.message);

  });

});