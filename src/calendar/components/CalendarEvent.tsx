import React from 'react'
import { EventProps } from 'react-big-calendar';
import { IMEvent } from '../pages/Calendar';

export interface ICalendarEvent extends EventProps<IMEvent> {

}

export const CalendarEvent = (props: ICalendarEvent) => {

  return (
    <div>
      <h5>
        {props.event.title}
      </h5>
      <p>
        {props.event.user.name}
      </p>
    </div>
  )
}
