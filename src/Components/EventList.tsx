import {ListGroup, ListGroupItem} from "react-bootstrap";
import MarketEntry from "./MarketEntry";
import EventTitle from "./EventTitle";

export default function EventList({events, isPinny}: { events: any[], isPinny: boolean }) {
  return (
      <ListGroup>
        {events.map(event => (
            <ListGroupItem className="bg-dark text-white-50">
              <EventTitle event={event}/>
              <ListGroup>
                {event.odds && Object.entries(event.odds).map(([market, marketEntry]: any) => (
                    <MarketEntry marketEntry={marketEntry}/>
                ))}
              </ListGroup>
            </ListGroupItem>
        ))}
      </ListGroup>
  )
}