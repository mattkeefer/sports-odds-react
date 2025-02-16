import {Badge, ListGroupItem} from "react-bootstrap";

export default function BookEntry({bookEntry}: { bookEntry: any }) {
  return (
      <ListGroupItem
          className="bg-dark text-white-50">
        <div className="flex-grow-1 row">
          <div className="col-2">{bookEntry.name}</div>
          <div className="col">
            <Badge bg="primary me-2">{bookEntry.odds > 0 && '+'}{bookEntry.odds}</Badge>
            {bookEntry.overUnder && `o/u: ${bookEntry.overUnder}`}
          </div>
          <div className="col">
            <Badge bg="success">{(bookEntry.ev * 100).toFixed(2)}%</Badge>
          </div>
          <div className="col">
            <Badge bg="danger">${(bookEntry.recommendedBetSize).toFixed(2)}</Badge>
          </div>
        </div>
      </ListGroupItem>
  );
}