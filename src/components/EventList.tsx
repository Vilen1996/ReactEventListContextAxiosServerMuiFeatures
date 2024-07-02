import { useState, useContext } from "react";
import { EventContext } from "../lib/Context";
import { CopyModal } from "./CopyModal";
import "./style.css";

export const EventList: React.FC = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("Out of Provider...");
  }
  const { state } = context;
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (eventToEdit) => {
    setSelectedEvent(eventToEdit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <h3>Event List</h3>
      {state.events.map((event) => (
        <div key={event.id}>
          <img src={event.cover} className="event_img" />
          <p>{event.title}</p>
          <small>
            {event.type} by <strong>{event.composer}</strong>
          </small>
          <p>
            {event.date} at {event.time}
          </p>
          <button onClick={() => handleOpen(event)}>Copy</button>
        </div>
      ))}
      <CopyModal
        open={open}
        handleClose={handleClose}
        eventData={selectedEvent}
      />
    </>
  );
};
