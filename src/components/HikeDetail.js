import "../css/hikedetail.css";
import { useEffect, useState } from "react";
import GoogleMapModal from "./GoogleMapModal";
import SendCommentMessage from "./SendCommentMessage";
import Comments from "./Comments";
import useAxiosRefresh from "../hooks/useAxiosRefresh";

const HikeDetail = ({ individualHike,setIndividualHike,loadForeignProfile }) => {
  const [showMap, setShowMap] = useState(false);
  const [showCommentBox,setShowCommentBox]=useState(false)
  const [showComments, setShowComments]=useState(false)
  const [comments,setComments]=useState();
  const axiosRefresh=useAxiosRefresh();
  useEffect(()=>{

  },[comments])
  if (individualHike === undefined) return <div> Loading</div>;

  const onRouteReveal=()=>{
    setShowMap(true)
  }
  const handleShowCommentsClick= async ()=>{
    try{
        const response = await axiosRefresh.get("comment/hike/"+individualHike._id,{    
        withCredentials:true}
        )
        await setComments(response.data)
        setShowComments(true)

    }catch(err)
    {console.error(err)}
    setShowComments(!showComments)
  };

  const postComment= async (comment)=>{
    const individualHikeCopy={...individualHike}
    try {
      const response = await axiosRefresh.post("/comment/hike",
        JSON.stringify(comment),
        {
          withCredentials: true,
        }
      )
      console.log(response.data)
      individualHikeCopy.hikeComments.push(response.data._id)
      await setIndividualHike(individualHikeCopy)
      setShowCommentBox(false)

    } catch (err) {
      console.log(err);
    }
    await handleShowCommentsClick();
  }
const handleRequestProfile=async(e)=>{
  const userIdToView=(e.currentTarget.getAttribute("value"))
  await loadForeignProfile(userIdToView)
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
          <div className="date-time-join" value={individualHike.hikeOwnerId} onClick={(e)=>handleRequestProfile(e)}>
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
                <div className="comments-count" onClick={handleShowCommentsClick}>{showComments?"Hide Comments" :individualHike.hikeComments.length+"Comments" }</div>
                <div className="add-comment" onClick={()=>{setShowCommentBox(!showCommentBox)}}>{!showCommentBox? "AddComment" : "Hide"}</div>
        </div>

        {showCommentBox && <SendCommentMessage hikeId={individualHike._id} postComment={postComment}/>}

       

        {showComments&&<Comments comments={comments} setShowComments={setShowComments}/>}
    </div>
  );
};
export default HikeDetail;
