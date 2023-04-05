import { EventProps } from 'react-big-calendar';
import { ICalendarEventNotSerializable } from '../../types';


export interface ICalendarEventProps extends EventProps<ICalendarEventNotSerializable> {}

export const CalendarEventView: React.FC<ICalendarEventProps> = (props) => {

  return (
    <div>
      <h5>
        {props.event.title}
      </h5>
      <p>
        {props.event.user.name}
      </p>
    </div>
  );
}
