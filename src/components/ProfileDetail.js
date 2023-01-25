import { useState } from "react";
import "../css/profile-detail.css";
import useAuth from "../hooks/useAuth";
import MessageModal from "./MessageModal";

const ProfileDetail = ({ profile, id }) => {
  const [openMessage,setOpenMessage]=useState(false);
  const {auth}=useAuth();
  

  if (profile === undefined || profile === null) {
    return "Loading";
  }

  const handleMmessageClick= async()=>{
    setOpenMessage(true)


  }
  return (
    <div className="profile-detail">

      <div className="profile-info">
        <div className="name-etc">
          <ul>
              <li className="name">Name : {profile.personName}</li>
              <li className="location"> Location : {profile.personLocation}</li>
              <li className="age">
                Age : {profile.personAge}
            </li>
          </ul>
        </div>
        <div className="avatar" style={{backgroundImage:`url(${process.env.PUBLIC_URL+"/photo/"+profile.profilePhoto})`}}> </div>
      </div>
    <div className="profile-desc-cont">

      <div className="profile-description">{profile.personInfo}</div>


    {profile.profileOwnerAlias===auth.username?      <div className="edit-profile-btn-cont"><div>Edit</div></div>
 :      <div className="edit-profile-btn-cont" onClick={handleMmessageClick}><div>Message</div></div>
}
      </div>
      {openMessage&&<MessageModal foreignProfile={profile} setOpenMessage={setOpenMessage}/>}
    </div>
  );
};

export default ProfileDetail;
