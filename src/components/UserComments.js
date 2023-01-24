import "../css/user-comments.css"
import { useEffect, useState } from "react";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";

const UserComments =({findIndividualHike})=>{
    const [userComments, setUserComments] = useState();
    const axiosRefresh = useAxiosRefresh();
    const navigate=useNavigate();

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
    if(!userComments || userComments.length===0) return (<div className="user-comments-cont"> You have no comments to display</div>)
    console.log(userComments)


    const handleDeleteClick= async (e)=>{

      
      const [commentId,hikeId]=e.currentTarget.getAttribute("value").split(",")
      const commentCopy=userComments.slice();
      const filtered = commentCopy.filter((comm)=>comm._id !==commentId )
      console.log(filtered)
      try{
        const response = await axiosRefresh.delete("/comment/hike",
        {
          data: JSON.stringify({"commentId":commentId,"hikeId":hikeId}),
          headers: { 'Content-Type': 'application/json' },
          withCredentials:true
        })

      }catch(err){
        console.error(err)
      }
      setUserComments(filtered)

    }

    const handleViewClick= async (e)=>{
      const hikeId = (e.currentTarget.getAttribute("value"))
    await findIndividualHike;
    navigate("/hikes/"+hikeId)
    }


    const commentNodes=userComments?.map((comment,i)=>{
      return(
        <div key={i} className="user-comment-container">

            <div className="comment-info-options">


            <div className="date-time">{comment.time}</div>
            <div className="delete-view">
              <div value={[comment._id,comment.hikeToComment]} onClick={(e)=>handleDeleteClick(e)}>delete</div> <div className="view"onClick={(e)=>handleViewClick(e)} value={comment.hikeToComment}>view</div></div>
            

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