import { Link } from "react-router-dom";
import "../css/profile-nav.css"
import CreateProfile from "./CreateProfile";

const ProfileNav=({profile})=>{

    return (
        <div className="profile-nav">
            {profile===undefined||profile===null?<Link className="profile-nav-link" to="/profile/create" > Create profile </Link>:<Link className="profile-nav-link-left" to="/profile/edit" > Edit profile </Link>}

            <Link className="profile-nav-link" to="/profile/messages" > Messages </Link>
            <Link className="profile-nav-link" to="/profile/comments" > Comments </Link>
            <Link className="profile-nav-link" to="/profile/hikes" > Hikes </Link>
            <Link className="profile-nav-link-right" tabIndex={0} to="/profile" > Profile </Link>



          
        </div>
    )
}
export default ProfileNav;