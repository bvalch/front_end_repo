import { useEffect } from "react";
import axios from "../api/axios";
import "../css/profile-messages.css";
import useAxiosRefresh from "../hooks/useAxiosRefresh";
const ProfileMessages = () => {
  const axiosRefresh = useAxiosRefresh();

  const getAllMessageThreads = async () => {
    try {
      const response = await axiosRefresh.get("message", {
        withCredentials: true,
      })
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
    
  };



  useEffect(() => {
    getAllMessageThreads();
  }, []);

  return <div className="messages-container">"here be messages"</div>;
};
export default ProfileMessages;
