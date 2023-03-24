export interface IUIState {
  isModalOpen: boolean;
}


export interface ICalendarEventNew {
  title: string;
  notes: string;
  start: string;
  end: string;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}

export interface ICalendarEventNewNotSerializable {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    _id: string;
    name: string;
  };
}


export interface ICalendarEvent extends ICalendarEventNew {
  _id: string;
}

export interface ICalendarEventNotSerializable extends ICalendarEventNewNotSerializable {
  _id: string;
}

export interface ICalendarState {
  activeEvent: null | ICalendarEvent;
  events: ICalendarEvent[];
}


