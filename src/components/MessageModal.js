import "../css/message-modal.css";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import { useNavigate } from "react-router-dom";
const MessageModal = ({foreignProfile,setOpenMessage}) => {
    const navigate = useNavigate();
    const axiosRefresh=useAxiosRefresh();
    const {auth}=useAuth();

    const [message,setMessage]= useState({
        messageSender:"",
        messageRecepient:"",
        messageTitle:"",
        messageText:"",
        messageTime:"",
        messageSenderId:"",


    })

  const handleClose = () => {
    setOpenMessage(false)
  };

const handleMessgeInput=(e)=>{
    const messageObjCopy={...message}
    messageObjCopy[e.target.name]=e.target.value;
    setMessage(messageObjCopy)

}

//remember to close modal on complete
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const dateStamp= new Date().toISOString().split(".")[0].replace("T","/");
    const msgObjCopy={...message,messageSenderId:auth.userId,messageTime:dateStamp, messageRecepient:foreignProfile.profileOwnerId, messageSender:auth.username};
    try{
        const response = await axiosRefresh.post("/message",
        JSON.stringify(msgObjCopy),{
            withCredentials:true
        }
        )
    }catch(err){console.error(err)}
     setOpenMessage(false)
  }



  return (
    <div>
      <div className="overlay">
      <p className="close" onClick={handleClose}>
          X
        </p>
        <div className="message-box">
        <form onSubmit={handleSubmit}>

            <input onChange={(e)=>handleMessgeInput(e)} name="messageTitle" className="title" type="text" placeholder="Title"/>
            <textarea onChange={(e)=>handleMessgeInput(e)} name="messageText" className="message" type="textarea" placeholder="Message" />
            <div className="submit"><button>Submit</button></div>
        </form>
    
        </div>
        
      </div>
    </div>
  );
};

export default MessageModal;
