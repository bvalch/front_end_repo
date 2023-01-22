import "../css/sendcommesg.css";
import { useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh"
import { useNavigate } from "react-router-dom";
import { axiosRefresh } from "../api/axios";



const SendCommentMessage = ({hikeId}) => {
    const [comment, setComment]=useState("")

    const handleCommentSubmit= async ()=>{
        const currentTime = new Date().toJSON().slice(0,19).replace('T',' ')
        const commentObject = {
            hikeToComment:hikeId,
            comment,
            time:currentTime
        }
        try{await axiosRefresh.post("/hikes/comment",
        JSON.stringify(commentObject)
        
        {
          withCredentials:true
        })


        }catch(err){    
    console.log(err)

}
    }




  return (
    <div className="add-comment-box">


<div class="input-container">
  <textarea value={comment} onChange={(e)=>setComment(e.target.value)} class="input-field"></textarea>
</div>

      <div className="submit-comment-container">
        <div onClick={handleCommentSubmit} className="submit-comment">Submit</div>
      </div>
    </div>
  );
};
export default SendCommentMessage;
