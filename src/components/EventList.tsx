import { useContext } from "react"
import { EventContext } from "../lib/Context"
import "./style.css"
export const EventList:React.FC = () => {
    const context = useContext(EventContext)
    if(!context){
       throw new Error("Oot of Provider...") 
    }
    const {state} = context
    return <>
        <h3>Event List</h3>
        {
            state.events.map(event => <div key={event.id}>
                <img src={event.cover} className="event_img"/>
                <p>{event.title}</p>
                <small>{event.type} by <strong>{event.composer}</strong></small>
                <p>{event.date} at {event.time}</p>
            </div>)
        }
    </>
}