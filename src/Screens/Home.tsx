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
import {useEffect, useState} from "react";
import EventList from "../Components/EventList";
import {fetchAccountLimits, findPinnyBets, findPositiveEvBets} from "../Clients/oddsClient";

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

  useEffect( () => {
    fetchLimits();
  }, []);

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
      const res = isPinny ?
          await findPinnyBets(isLive, leagueID, minOdds, maxOdds, minEV / 100) :
          await findPositiveEvBets(isLive, leagueID, minOdds, maxOdds, minEV / 100);
      if (res) {
        setEvents(res);
        setIsSearchComplete(true);
        fetchLimits();
      }
    } catch (err: any) {
      setError(err);
      setIsSearchComplete(true);
      fetchLimits();
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
          <Button variant="primary" onClick={fetchEvents} className="mt-2">Find Bets</Button>
        </Form>
        {apiLimit && <ProgressBar className="mb-4" now={apiLimit} label={`${apiLimit}%`}/>}
        {isSearchComplete && events.length > 0 && <EventList events={events} isPinny={isPinny}/>}
        {isSearchComplete && events.length === 0 && <div className="text-white">No search results found...</div>}
      </Container>
  );
}