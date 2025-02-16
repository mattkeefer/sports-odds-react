import {ListGroup, ListGroupItem} from "react-bootstrap";
import BookEntry from "./BookEntry";
import MarketEntryTitle from "./MarketEntryTitle";

export default function MarketEntry({marketEntry}: { marketEntry: any }) {
  return (
      <ListGroupItem className="bg-dark text-white">
        <MarketEntryTitle marketEntry={marketEntry}/>
        <ListGroup variant="flush">
          {marketEntry.positiveEvBets &&
              Object.entries(marketEntry.positiveEvBets).sort(
                  ([a, aEntry]: any, [b, bEntry]: any) => {
                    return bEntry.ev - aEntry.ev;
                  }).map(([book, bookEntry]: any) => <BookEntry
                  bookEntry={bookEntry}/>
              )}
        </ListGroup>
      </ListGroupItem>
  );
}