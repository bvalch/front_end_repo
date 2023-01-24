import { Link } from "react-router-dom";
import "../css/profile-nav.css"
import CreateProfile from "./CreateProfile";

const ProfileNav=({profile})=>{

    return (
        <div className="profile-nav">
            {profile===undefined||profile===null?<Link to="/profile/create" > Create profile </Link>:<Link to="/profile/edit" > Edit profile </Link>}

            <Link to="/profile/msgs" > Messages </Link>
            <Link to="/profile/comments" > Comments </Link>
            <Link to="/profile/hikes" > Hikes </Link>
            <Link to="/profile" > Profile </Link>



          
        </div>
    )
}
export default ProfileNav;