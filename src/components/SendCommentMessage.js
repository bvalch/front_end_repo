import "../css/sendcommesg.css";
import { useState } from "react";

const SendCommentMessage = ({ hikeId, postComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async () => {
    const currentTime = new Date().toJSON().slice(0, 19).replace("T", " ");
    const commentObject = {
      hikeToComment: hikeId,
      comment,
      time: currentTime,
    };
   await postComment(commentObject)
   setComment("")

  };

  return (
    <div className="add-comment-box">
      <div className="input-container">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          class="input-field"
        ></textarea>
      </div>

      <div className="submit-comment-container">
        <div onClick={handleCommentSubmit} className="submit-comment">
          Submit
        </div>
      </div>
    </div>
  );
};
export default SendCommentMessage;
