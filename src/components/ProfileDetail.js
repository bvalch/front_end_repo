import { useState } from "react";
import "../css/profile-detail.css";
import useAuth from "../hooks/useAuth";
import MessageModal from "./MessageModal";

const ProfileDetail = ({ profile, id }) => {
  const [openMessage,setOpenMessage]=useState(true);
  const {auth}=useAuth();
  

  if (profile === undefined || profile === null) {
    return "Loading";
  }

  const handleMmessageClick= async()=>{


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

      <div className="edit-profile-btn-cont"><div>{profile.profileOwnerAlias===auth.username? "Edit Profile": " Message"}</div></div>

      </div>
      {openMessage&&<MessageModal foreignProfile={profile}/>}
    </div>
  );
};

export default ProfileDetail;
