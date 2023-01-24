import { Outlet } from "react-router-dom";
import ProfileNav from "./ProfileNav";
const ProfileLayout=({profile})=>{


    return(
        <div className="profile-container">
        <ProfileNav profile={profile}/>
        <Outlet />
        </div>
    )
}
export default ProfileLayout;