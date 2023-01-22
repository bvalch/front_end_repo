import "../css/hikedetail.css";
import { useState } from "react";
import GoogleMapModal from "./GoogleMapModal";
import SendCommentMessage from "./SendCommentMessage";

const HikeDetail = ({ individualHike }) => {
  const [showMap, setShowMap] = useState(false);
  const [showCommentBox,setShowCommentBox]=useState(false)
  if (individualHike === undefined) return <div> Loading</div>;

//   console.log(individualHike);
  const onRouteReveal=()=>{
    setShowMap(true)
  }

  const handleAddCommentClick=()=>{

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

      <div className="comments-addcomment-cont">
                <div className="comments-count">  Comments:0</div>
                <div className="add-comment" onClick={()=>{setShowCommentBox(!showCommentBox)}}>{!showCommentBox? "AddComment" : "Hide"}</div>
        </div>
        {showCommentBox && <SendCommentMessage/>}

       

        <div className="comments-container">

        </div>
    </div>
  );
};
export default HikeDetail;
