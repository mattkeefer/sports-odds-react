import {FaCircle} from "react-icons/fa";

export default function EventTitle({event}: { event: any }) {
  const startDate = new Date(event.startsAt);

  return (
      <div className="ms-2 mb-2 text-white">
        <FaCircle style={{
          "color": event.homeColor,
          "border": "solid white 2px",
          "borderRadius": "50%"
        }}/>
        <span className="fw-bold"> {event.homeTeam}</span> vs. <span
          className="fw-bold">{event.awayTeam} </span>
        <FaCircle style={{
          "color": event.awayColor,
          "border": "solid white 2px",
          "borderRadius": "50%"
        }}/>
        <div className="text-white-50">
          {startDate.toDateString()} - {startDate.toLocaleTimeString().slice(0, -6)}
          {startDate.toLocaleTimeString().slice(-3)}
        </div>
      </div>
  );
}