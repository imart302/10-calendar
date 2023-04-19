import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/routes';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { createTestStore} from '../fixtures/createTestStore';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import React from 'react';
import { authState } from '../fixtures/auth';
import { Calendar } from '../../src/calendar/pages/Calendar';

vi.mock('../../src/hooks/useAuthStore');
vi.mock('../../src/calendar/pages/Calendar');

describe('Tests on <AppRouter>', () => {
  let mockStore = createTestStore();

  it('Should show loading screen and call checkAuthToken', () => {
    
    vi.mocked(useAuthStore).mockReturnValue({
      auth: {
        state: 'renew'
      },
      checkAuthToken: vi.fn(async () => {})
    });

    render(<AppRouter />, {
      wrapper: ({children}) => <MemoryRouter><Provider store={mockStore}>{children}</Provider></MemoryRouter>
    });

    expect(screen.getByLabelText('simple spinner')).toBeDefined();

  });

  it('Should show login when no auth', () => {
    
    vi.mocked(useAuthStore).mockReturnValue({
      auth: {
        state: 'no-auth'
      },
      checkAuthToken: vi.fn(async () => {})
    });

    render(<AppRouter />, {
      wrapper: ({children}) => <MemoryRouter><Provider store={mockStore}>{children}</Provider></MemoryRouter>
    });

    expect(screen.getByLabelText('login main container')).toBeDefined();
  });

  it('Should show the calendar when is auth', () => {
    
    vi.mocked(Calendar).mockReturnValue(<div aria-label='calendar mock'></div>)
    vi.mocked(useAuthStore).mockReturnValue({
      auth: authState,
      checkAuthToken: vi.fn(async () => {})
    });

    render(<AppRouter />, {
      wrapper: ({children}) => <MemoryRouter><Provider store={mockStore}>{children}</Provider></MemoryRouter>
    });

    expect(screen.getByLabelText('calendar mock')).toBeDefined();
  
  });

  it('Navigate when no auth always show login', () => {
    
    vi.mocked(useAuthStore).mockReturnValue({
      auth: {
        state: 'no-auth'
      },
      checkAuthToken: vi.fn(async () => {})
    });

    render(<AppRouter />, {
      wrapper: ({children}) => <MemoryRouter initialEntries={['/bad/route']}><Provider store={mockStore}>{children}</Provider></MemoryRouter>
    });

    expect(screen.getByLabelText('login main container')).toBeDefined();
  });

});