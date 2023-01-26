import { useEffect, useState } from "react";
import "../css/profile-messages.css";
import useAuth from "../hooks/useAuth";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
import MessageThreadDetail from "./MessageThreadDetail";

const ProfileMessages = () => {
    const {auth} = useAuth();
  const axiosRefresh = useAxiosRefresh();
  const [sentMessageThreads, setSentMessageThreads] = useState();
  const [recievedMessageThreads, setRecievedMessageThreads] = useState();
  const [allMessageThreads, setAllMessageThreads] = useState();
  const [SingleMessgeThread, setSingleMessgeThread] = useState();
  const [displaySingle, setDisplaySingle] = useState(false);

  //TODO on show single click make a call to the backend and update the boolean "read" to true, also flip it in state

  const getAllMessageThreads = async () => {
    try {
      const response = await axiosRefresh.get("message", {
        withCredentials: true,
      });
      console.log(response.data);
      const sent = response.data.sent;
      const recieved = response.data.recieved;
      setSentMessageThreads(sent);
      setRecievedMessageThreads(recieved);
      setAllMessageThreads([...recieved, ...sent]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllMessageThreads();
  }, []);

  const handleDisplaySingle = async (e) => {
    const threadId = e.target.getAttribute("value");
    const singleThread = allMessageThreads.filter((thread) => thread.messageThreadId === threadId);
    // console.log(singleThread);
    //update message boolean in DB
    try{
        await axiosRefresh.put("/message/"+singleThread[0]._id,JSON.stringify({"username":auth.username}),{
            withCredentials:true
        })

    }catch(err){console.error(err)}

    setSingleMessgeThread(singleThread);
    setDisplaySingle(true);
  };

  if (!allMessageThreads) return "Loading";
  const allMessageThreadNodes = allMessageThreads.map((msgThr, i) => {
    let cnt = 0;
    msgThr.threadMessages.forEach((obj) => {
      if (obj.read === false) {
        cnt += 1;
      }
    });
    return (
      <div key={i} className="message-nodes">
        <div className="date-sender-title">
          <div
            className="new-messages"
            onClick={(e) => handleDisplaySingle(e)}
            value={msgThr.messageThreadId}
          >
            {cnt !== 0 ? cnt + " unread" : "no unread "}{" "}
          </div>
          <div>From Sender</div>
        </div>
      </div>
    );
  });

  return (
    <div className="messages-container">
      {displaySingle
        ? SingleMessgeThread && (
            <MessageThreadDetail messageThread={SingleMessgeThread[0]} setDisplaySingle={setDisplaySingle} />
          )
        : allMessageThreadNodes}
    </div>
  );
};
export default ProfileMessages;
