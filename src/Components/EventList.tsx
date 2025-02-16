import {Badge, ListGroup, ListGroupItem} from "react-bootstrap";

export default function EventList({events, isPinny}: { events: any[], isPinny: boolean }) {
  return (
      <ListGroup>
        {events.map(event => (
            <ListGroupItem className="bg-dark text-white-50">
              <div className="ms-2 mb-2 me-auto">
                <span className="fw-bold"
                      style={{"color": event.homeColor}}>{event.homeTeam}</span> vs. <span
                  className="fw-bold" style={{"color": event.awayColor}}>{event.awayTeam}</span>
              </div>
              <ListGroup>
                {event.odds && Object.entries(event.odds).map(([market, marketEntry]: any) => (
                    <ListGroupItem className="bg-dark text-white">
                      {marketEntry.marketName} {marketEntry.sideID}
                      <span className="ms-4">
                        Fair odds: {marketEntry.fairOdds > 0 && '+'}{marketEntry.fairOdds}
                        {marketEntry.fairOverUnder && `, o/u: ${marketEntry.fairOverUnder}`}
                      </span>
                      <span className="ms-4">
                        Avg. odds: {marketEntry.bookOdds > 0 && '+'}{marketEntry.bookOdds}
                        {marketEntry.bookOverUnder && `, o/u: ${marketEntry.bookOverUnder}`}
                      </span>
                      {isPinny && <span className="ms-4">
                        Pinny odds: <Badge
                          bg="danger">{marketEntry.pinnyOdds > 0 && '+'}{marketEntry.pinnyOdds}</Badge>
                      </span>}
                      <ListGroup variant="flush">
                        {marketEntry.positiveEvBets && Object.entries(marketEntry.positiveEvBets).sort(([a, aEntry]: any, [b, bEntry]: any) => {
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