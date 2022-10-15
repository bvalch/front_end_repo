import { redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";

const Profile = () => {
    const { auth } = useAuth();
    // console.log(auth)


    return (auth?.user ? <><h1>Profile page</h1> <br /> <NavBar/>
    </> : <div>not authorised  <NavBar/></div> )



};

export default Profile;
