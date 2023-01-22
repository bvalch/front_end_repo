import "../css/hikedetail.css";
import { useState } from "react";
import GoogleMapModal from "./GoogleMapModal";

const HikeDetail = ({ individualHike }) => {
  const [showMap, setShowMap] = useState(false);
  if (individualHike === undefined) return <div> Loading</div>;

  console.log(individualHike);
  const onRouteReveal=()=>{
    setShowMap(true)
  }

  return (
    <div className="hikedetail">
      <div className="from-to-container">
        <div className="left-container">
          <div className="from-to">
            {individualHike.hikeOrigin.split(",")[0]}
          </div>{" "}
          <div className="from-to">to</div>{" "}
          <div className="from-to">
            {individualHike.hikeDestination.split(",")[0]}
          </div>
        </div>

        <div className="right-container">
          <div className="date-time-join">
            {individualHike.hikeDate} at {individualHike.hikeTime}
          </div>
          <div className="date-time-join">
            Transport : {individualHike.hikeTransport}
          </div>
          <div className="date-time-join">
            Organiser: {individualHike.hikeOwner}
          </div>
        </div>
      </div>
      <div className="actions-menu">
        <div className="actoon" onClick={onRouteReveal}>Reveal route</div>
        <div className="actoon">Join</div>
        <div className="actoon">Message</div>
      </div>

      <div className="hike-description">{individualHike.hikeInfo}</div>
      { showMap && <GoogleMapModal showMap={showMap} setShowMap={setShowMap} origin={individualHike.hikeOrigin} destination={individualHike.hikeDestination} transport={individualHike.hikeTransport} /> }
    </div>
  );
};
export default HikeDetail;
