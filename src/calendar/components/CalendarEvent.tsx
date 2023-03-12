import React from 'react'
import { EventProps } from 'react-big-calendar';
import { IMEvent } from '../pages/Calendar';

export interface ICalendarEvent extends EventProps<IMEvent> {

}

export const CalendarEvent = (props: ICalendarEvent) => {
  console.log(props);

  return (
    <div>CalendarEvent</div>
  )
}
