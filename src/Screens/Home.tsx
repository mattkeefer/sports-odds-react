import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form,
  FormCheck, FormControl,
  FormSelect, ProgressBar,
  Row
} from "react-bootstrap";
import {useState} from "react";
import EventList from "../Components/EventList";
import {fetchAccountLimits, findGoodBets} from "../Clients/oddsClient";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [apiLimit, setApiLimit] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [error, setError] = useState<Error>();
  const [isLive, setIsLive] = useState(false);
  const [isPinny, setIsPinny] = useState(true);
  const [leagueID, setLeagueID] = useState("NBA");
  const [minOdds, setMinOdds] = useState(-400);
  const [maxOdds, setMaxOdds] = useState(300);
  const [minEV, setMinEV] = useState(0.0);

  const fetchLimits = async () => {
    const res = await fetchAccountLimits();
    if (res) {
      setApiLimit(res);
    }
  }

  const fetchEvents = async () => {
    try {
      setIsSearchComplete(false);
      setEvents([]);
      setError(undefined);
      const res = await findGoodBets(isLive, leagueID, minOdds, maxOdds, minEV / 100, isPinny);
      if (res) {
        setEvents(res);
        setIsSearchComplete(true);
      }
    } catch (err: any) {
      if (err.message.includes('404')) {
        setEvents([]);
      } else {
        setError(err);
      }
      setIsSearchComplete(true);
    }
  }

  return (
      <Container>
        <Row className="mb-2">
          <h1>Profitable Bet Finder</h1>
        </Row>
        {error && <Alert variant="danger">{error.message}</Alert>}
        <Form className="mb-4 col-4">
          <div className="d-flex mb-2">
            <FormCheck type="checkbox" label="Live Events" checked={isLive}
                       onClick={() => setIsLive(!isLive)}/>
            <FormCheck className="ms-4" type="checkbox" label="Pinny" checked={isPinny}
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
          <div className="d-flex my-2">
            <FloatingLabel label="Min Odds">
              <FormControl type="number" value={minOdds}
                           onChange={(e) => setMinOdds(parseInt(e.target.value))}/>
            </FloatingLabel>
            <FloatingLabel label="Max Odds">
              <FormControl type="number" value={maxOdds}
                           onChange={(e) => setMaxOdds(parseInt(e.target.value))}/>
            </FloatingLabel>
            <FloatingLabel label="Min EV">
              <FormControl type="number" value={minEV}
                           onChange={(e) => setMinEV(parseFloat(e.target.value))}/>
            </FloatingLabel>
          </div>
          <div className="d-flex">
            <Button variant="primary" onClick={fetchEvents} className="mt-2">Find Bets</Button>
            <Button variant="outline-primary" onClick={fetchLimits} className="mt-2 ms-4">Check
              Limit</Button>
          </div>
        </Form>
        {apiLimit !== 0 && <ProgressBar className="mb-4" now={apiLimit} label={`${apiLimit}%`}/>}
        {isSearchComplete && events.length > 0 && <EventList events={events} isPinny={isPinny}/>}
        {isSearchComplete && events.length === 0 &&
            <div className="text-white">No search results found...</div>}
      </Container>
  );
}