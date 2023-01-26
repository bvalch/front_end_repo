import "../css/profile-messages.css";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
const MessageThreadDetail = ({ messageThread, setDisplaySingle }) => {

    const axiosRefresh=useAxiosRefresh();
    const {auth} = useAuth()
  const [showReply, setShowReply] = useState(false);
  const [message, setMessage] = useState({
    Title: "",
    text: "",
    
  });

  if (!messageThread) return "Loading";
  const handleReplyButtonClick = () => {
    setShowReply(!showReply);
  };

  const messageNodes = messageThread.threadMessages.map((el, i) => {
    return (
      <div key={i}>
        <div className="message-body">
          <div className="title-sender-time">
            <div>From: {el.from}</div>
            <div>{el.Title}</div>
            <div>{el.datestamp}</div>
          </div>

          <div className="message-text">{el.text} </div>
        </div>
      </div>
    );
  });
  const handleMessgeInput = (e) => {
    const messageObjCopy={...message}
    messageObjCopy[e.target.name]=e.target.value;
    setMessage(messageObjCopy)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateStamp= new Date().toISOString().split(".")[0].replace("T","/");
    const msgObjCopy={...message,from:auth.username,datestamp:dateStamp,threadToAttachTo:messageThread._id};
    try{
        const response = await axiosRefresh.post("/message/"+messageThread._id,
        JSON.stringify(msgObjCopy),{
            withCredentials:true
        }
        )
    }catch(err){console.error(err)}
     setShowReply(false)
  };
  return (
    <div>
      <div className="whole-message-cont">
        {messageNodes}

        <div className="reply-back">
          <div onClick={() => setDisplaySingle(false)} className="back">
                Back
          </div>
          <div className="reply" onClick={handleReplyButtonClick}>
            {showReply? "Close" : "Reply"}
          </div>
        </div>
      </div>

      {showReply ? (
        <div className="reply-container">
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => handleMessgeInput(e)}
              name="Title"
              className="title"
              type="text"
              placeholder="Title"
            />
            <textarea
              onChange={(e) => handleMessgeInput(e)}
              name="text"
              className="message"
              type="textarea"
              placeholder="Message"
            />
            <div className="submit">
              <button>Submit</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default MessageThreadDetail;
