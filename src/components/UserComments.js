import "../css/user-comments.css"
import { useEffect, useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import axios from "../api/axios";
const UserComments =()=>{
    const [userComments, setUserComments] = useState();
    const axiosRefresh = useAxiosRefresh();

    useEffect(()=>{
        const controller = new AbortController();
        const getUserComments = async () => {
        try {
          const response = await axiosRefresh.get("comment/user/getall", {
            signal: controller.signal,
          });
          console.log(response.data);
          return response.data
        } catch (err) {
          console.error(err);
        }
      }
      getUserComments().then((data)=>setUserComments(data))
      return () => {
        controller.abort();
    };
    },[])
    if(!userComments) return"Loading"


    const handleDeleteClick= async (e)=>{

      const commentId = (e.currentTarget.getAttribute("value"))
      const commentCopy=userComments.slice();
      const filtered = commentCopy.filter((comm)=>comm._id !==commentId )
      try{
        const response = await axiosRefresh.delete("/comment/hike",
        {
          data: JSON.stringify({"commentId":commentId}),
          headers: { 'Content-Type': 'application/json' },
          withCredentials:true
        })

      }catch(err){
        console.error(err)
      }
      setUserComments(filtered)

    }

    const handleViewClick=()=>{
      console.log("viewin")
    }


    const commentNodes=userComments?.map((comment,i)=>{
      return(
        <div key={i} className="user-comment-container">

            <div className="comment-info-options">


            <div className="date-time">{comment.time}</div>
            <div className="delete-view">
              <div value={comment._id} onClick={(e)=>handleDeleteClick(e)}>delete</div> <div className="view" calue={comment.hikeToComment}>view</div></div>
            

            </div>


            
            <div className="comment-body">{comment.comment}</div>

          </div>
          

      )
    })

    return (
        <div className="user-comments-cont">
          {commentNodes}
          
          </div>

          
    )

};
export default UserComments