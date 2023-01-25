import "../css/message-modal.css";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
const MessageModal = ({foreignProfile}) => {
    const {auth}=useAuth();
    const [message,setMessage]= useState({
        messageSender:"",
        messageRecepient:"",
        messageTitle:"",
        messageText:"",
        messageTime:"",
        messageSenderId:"",


    })

    //TODO:close modal
  const handleClose = () => {};

const handleMessgeInput=(e)=>{
    console.log(e.target.value)
    const messageObjCopy={...message}
    messageObjCopy[e.target.name]=e.target.value;
    setMessage(messageObjCopy)

}
  const handleSubmit=(e)=>{
    e.preventDefault();
    const dateStamp= new Date().toISOString().split(".")[0].replace("T","/");
    const msgObjCopy={...message,messageSenderId:auth.userId,messageTime:dateStamp, messageRecepient:foreignProfile.profileOwnerId, messageSender:auth.username};
    
    console.log(msgObjCopy)



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
