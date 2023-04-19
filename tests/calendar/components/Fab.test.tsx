import { render, screen, fireEvent} from '@testing-library/react';
import { Fab } from '../../../src/calendar/components/Fab';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';
import { useUIStore } from '../../../src/hooks/useUIStore';
import { vi } from 'vitest';
import React from 'react';


vi.mock('../../../src/hooks/useCalendarStore', () => {
    return {
      useCalendarStore: vi.fn(() => {
        return {
          setActiveCalendarEvent: vi.fn(() => {})
        }
      }),
    }
});
vi.mock('../../../src/hooks/useUIStore', () => {
  return {
    useUIStore: vi.fn(() => {
      return {
        openDateModal: vi.fn(() => {}),
      }
    })
  }
})

describe('Tests on <Fab /> component', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Should show the component', () => {

    render(<Fab />);
    const button = screen.getByLabelText<HTMLButtonElement>('fab button');

    expect(button).toBeDefined();
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
    expect(button.classList.contains('fab')).toBe(true);

  });

  it('Should call setActiveEvent(null) and openDateModal when click', () => {
    const mockSetActiveEvent = vi.fn(() => {});
    const mockOpenModal = vi.fn(() => {});
    
    vi.mocked(useCalendarStore).mockReturnValue({
      setActiveCalendarEvent: mockSetActiveEvent,
      activeEvent: null,
      calendarEvents: [],
      createNewEvent: vi.fn(),
      deleteEvent: vi.fn(),
      deserializedEvents: [],
      deserializeEvents: vi.fn(),
      fetchEvents: vi.fn(),
      serializeEvents: vi.fn(),
      updateEvent: vi.fn(),
    });
    vi.mocked(useUIStore).mockReturnValue({
      closeDateModal: vi.fn(),
      isDateModalOpen: true,
      openDateModal: mockOpenModal,
    });

    render(<Fab />);
    const button = screen.getByLabelText<HTMLButtonElement>('fab button');

    fireEvent.click(button);

    expect(mockSetActiveEvent).toHaveBeenCalledWith(null);
    expect(mockOpenModal).toHaveBeenCalled();

  });

});