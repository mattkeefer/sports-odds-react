import {Badge, ListGroup, ListGroupItem} from "react-bootstrap";
import {FaCircle} from "react-icons/fa";

export default function EventList({events, isPinny}: { events: any[], isPinny: boolean }) {
  return (
      <ListGroup>
        {events.map(event => (
            <ListGroupItem className="bg-dark text-white-50">
              <div className="ms-2 mb-2 text-white">
                <FaCircle style={{"color": event.homeColor, "border": "solid white 2px", "borderRadius": "50%"}}/>
                <span className="fw-bold"> {event.homeTeam}</span> vs. <span
                  className="fw-bold">{event.awayTeam} </span>
                <FaCircle style={{"color": event.awayColor, "border": "solid white 2px", "borderRadius": "50%"}}/>
              </div>
              <ListGroup>
                {event.odds && Object.entries(event.odds).map(([market, marketEntry]: any) => (
                    <ListGroupItem className="bg-dark text-white">
                      <div className="row">
                        <div className="col-4">{marketEntry.marketName}</div>
                        <div className="col">{marketEntry.sideID}</div>
                        <div className="col">
                          Fair: {marketEntry.fairOdds > 0 && '+'}{marketEntry.fairOdds}
                          {marketEntry.fairOverUnder && `, o/u: ${marketEntry.fairOverUnder}`}
                        </div>
                        <div className="col">
                          Avg: {marketEntry.bookOdds > 0 && '+'}{marketEntry.bookOdds}
                          {marketEntry.bookOverUnder && `, o/u: ${marketEntry.bookOverUnder}`}
                        </div>
                        {marketEntry.pinnyOdds && <div className="col">
                          Pinny: <Badge
                            bg="danger">{marketEntry.pinnyOdds > 0 && '+'}{marketEntry.pinnyOdds}</Badge>
                        </div>}
                      </div>
                      <ListGroup variant="flush">
                        {marketEntry.positiveEvBets &&
                            Object.entries(marketEntry.positiveEvBets).sort(
                                ([a, aEntry]: any, [b, bEntry]: any) => {
                                  return bEntry.ev - aEntry.ev;
                                }).map(([book, bookEntry]: any) => (
                                <ListGroupItem
                                    className="bg-dark text-white-50 d-flex justify-content-between">
                                  <div className="flex-grow-1 row">
                                    <div className="col-2">{bookEntry.name}</div>
                                    <div className="col">
                                      <Badge bg="primary"
                                             className="mx-2">{bookEntry.odds > 0 && '+'}{bookEntry.odds}</Badge>
                                      {bookEntry.overUnder && `o/u: ${bookEntry.overUnder}`}
                                    </div>
                                  </div>
                                  <Badge bg="success">{(bookEntry.ev * 100).toFixed(2)}%</Badge>
                                </ListGroupItem>
                            ))}
                      </ListGroup>
                    </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
        ))}
      </ListGroup>
  )
}