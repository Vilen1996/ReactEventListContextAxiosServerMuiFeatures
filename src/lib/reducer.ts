import { ActionTypes, FilterTypes, IAction, IEvent, IState } from "./types";

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionTypes.setEvents:
      return {
        ...state,
        events: action.payload as IEvent[],
      };
    case ActionTypes.setFilter:
      return {
        ...state,
        currentFilter: action.payload as FilterTypes,
      };
    case ActionTypes.addEvent:
      return {
        ...state,
        events: [...state.events, action.payload as IEvent],
      };
    case ActionTypes.updateEvent:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === (action.payload as IEvent).id
            ? (action.payload as IEvent)
            : event
        ),
      };
    default:
      return state;
  }
};
