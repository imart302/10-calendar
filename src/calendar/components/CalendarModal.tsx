import { addHours } from 'date-fns';
import React from 'react';
import Modal from 'react-modal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export interface CalendarModalSte {
  modalOpen: boolean;
  form: {
    title: string;
    notes: string;
    start: Date;
    end: Date;
  };
}

export const CalendarModal = () => {
  const [state, setState] = React.useState<CalendarModalSte>({
    modalOpen: false,
    form: {
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
    },
  });

  function openModal() {
    setState((actual) => {
      return {
        ...actual,
        modalOpen: true,
      };
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setState((actual) => {
      return {
        ...actual,
        modalOpen: false,
      };
    });
  }

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
          end: actual.form.end < (date ?? actual.form.start) ? addHours(date ?? actual.form.start, 2) : actual.form.end,
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

  return (
    <Modal
      isOpen={true}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            className="form-control"
            selected={state.form.start}
            onChange={onStartDateChange}
            dateFormat="Pp"
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
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            style={{ resize: 'none' }}
            onChange={onTextAreaChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
