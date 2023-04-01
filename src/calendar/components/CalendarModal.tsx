import { addHours, differenceInSeconds, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import React, { useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useUIStore, useCalendarStore, useAuthStore } from '../../hooks';
import { ICalendarEvent, ICalendarEventNew } from '../../types';

import 'sweetalert2/dist/sweetalert2.min.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

registerLocale('es', es);

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export interface CalendarModalSte {
  form: {
    title: string;
    notes: string;
    start: Date;
    end: Date;
  };
  formSubmitted: boolean;
}

export const CalendarModal = () => {
  const { isDateModalOpen, openDateModal, closeDateModal } = useUIStore();
  const {
    activeEvent,
    setActiveCalendarEvent,
    createNewEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarStore();
  const { auth } = useAuthStore();

  const [state, setState] = React.useState<CalendarModalSte>({
    form: {
      title: activeEvent?.title ?? '',
      notes: activeEvent?.notes ?? '',
      start: activeEvent?.start ? parseISO(activeEvent.start) : new Date(),
      end: activeEvent?.end
        ? parseISO(activeEvent.end)
        : addHours(new Date(), 2),
    },
    formSubmitted: false,
  });

  useEffect(() => {
    setState((actual) => {
      return {
        ...actual,
        form: {
          title: activeEvent?.title ?? '',
          notes: activeEvent?.notes ?? '',
          start: activeEvent?.start ? parseISO(activeEvent.start) : new Date(),
          end: activeEvent?.end
            ? parseISO(activeEvent.start)
            : addHours(new Date(), 2),
        },
      };
    });

    return () => {};
  }, [activeEvent]);

  const titleClass = useMemo(() => {
    if (!state.formSubmitted) {
      return '';
    }

    if (state.form.title.length <= 0) {
      return 'is-invalid';
    }

    return '';
  }, [state.form.title, state.formSubmitted]);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setState((actual) => {
      return {
        ...actual,
        form: {
          ...actual.form,
          [name]: value,
        },
      };
    });
  };

  const onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((actual) => {
      return {
        ...actual,
        form: {
          ...actual.form,
          notes: event.target.value ?? '',
        },
      };
    });
  };

  const onStartDateChange = (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => {
    setState((actual) => {
      return {
        ...actual,
        form: {
          ...actual.form,
          start: date ?? actual.form.start,
          end:
            actual.form.end < (date ?? actual.form.start)
              ? addHours(date ?? actual.form.start, 2)
              : actual.form.end,
        },
      };
    });
  };

  const onEndDateChange = (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => {
    setState((actual) => {
      return {
        ...actual,
        form: {
          ...actual.form,
          end: date ?? actual.form.end,
        },
      };
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setState((actual) => {
      return {
        ...actual,
        formSubmitted: true,
      };
    });

    const difference = differenceInSeconds(state.form.end, state.form.start);

    if (isNaN(difference) || difference < 0) {
      Swal.fire('Intervalo de fechas no valido', 'Revisar las fechas');
      return;
    }

    if (state.form.title.length <= 0) {
      return;
    }

    if (activeEvent) {
      const updatedEvent: ICalendarEvent = {
        ...activeEvent,
        title: state.form.title,
        notes: state.form.notes,
        start: state.form.start.toISOString(),
        end: state.form.end.toISOString(),
      };

      updateEvent(updatedEvent);
    } else {
      const newEvent: ICalendarEventNew = {
        title: state.form.title,
        notes: state.form.notes,
        start: state.form.start.toISOString(),
        end: state.form.end.toISOString(),
        bgColor: '#fafafa',
        user: auth.user ?? { _id: '', name: '' },
      };

      createNewEvent(newEvent);
    }

    setState((actual) => {
      return {
        ...actual,
        formSubmitted: false,
      };
    });
    setActiveCalendarEvent(null);
    closeDateModal();
  };

  const handleDeleteEvent = () => {
    if (!activeEvent) return;
    deleteEvent(activeEvent);
    setActiveCalendarEvent(null);
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? activeEvent.title : 'Nueva Nota'} </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            className="form-control"
            selected={state.form.start}
            onChange={onStartDateChange}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            className="form-control"
            minDate={state.form.start}
            selected={state.form.end}
            onChange={onEndDateChange}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={state.form.title}
          />
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            style={{ resize: 'none' }}
            onChange={onTextAreaChange}
            value={state.form.notes}
          ></textarea>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-block"
            style={{ display: activeEvent ? 'inline' : 'none' }}
            onClick={handleDeleteEvent}
          >
            <i className="far fa-trash-can"></i>
          </button>
        </div>
      </form>
    </Modal>
  );
};
