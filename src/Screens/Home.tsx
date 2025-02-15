import {Alert, Button, Container, Form, FormCheck, FormSelect, Row} from "react-bootstrap";
import {useState} from "react";
import EventList from "../Components/EventList";
import {findPinnyBets, findPositiveEvBets} from "../Clients/oddsClient";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState<Error>();
  const [isLive, setIsLive] = useState(true);
  const [isPinny, setIsPinny] = useState(false);
  const [leagueID, setLeagueID] = useState("NBA");

  const fetchEvents = async () => {
    try {
      setEvents([]);
      setError(undefined);
      const res = isPinny ? await findPinnyBets(isLive, leagueID) : await findPositiveEvBets(isLive, leagueID);
      if (res) {
        setEvents(res);
      }
    } catch (err: any) {
      setError(err);
    }
  }

  return (
      <Container>
        <Row className="mb-2">
          <h1>Profitable Bet Finder</h1>
        </Row>
        {error && <Alert variant="danger">{error.message}</Alert>}
        {events && <EventList events={events}/>}
        <Form className="my-4 col-3">
          <div className="d-flex justify-content-between">
            <FormCheck type="checkbox" label="Live Events" checked={isLive}
                       onClick={() => setIsLive(!isLive)}/>
            <FormCheck type="checkbox" label="Pinny" checked={isPinny}
                       onClick={() => setIsPinny(!isPinny)}/>
          </div>
          <FormSelect value={leagueID} onChange={(e) => setLeagueID(e.target.value)}>
            <option value="NBA">NBA</option>
            <option value="MLB">MLB</option>
            <option value="NFL">NFL</option>
            <option value="NHL">NHL</option>
            <option value="MLS">MLS</option>
            <option value="EPL">Premier League</option>
            <option value="UEFA_CHAMPIONS_LEAGUE">Champions League</option>
            <option value="INTERNATIONAL_SOCCER">International Soccer</option>
          </FormSelect>
          <Button variant="primary" onClick={fetchEvents} className="mt-3">Find Bets</Button>
        </Form>
      </Container>
  );
}