import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/nav.css";
import logo from "../css/img/logo.png";

const NavBar = () => {
  const { auth } = useAuth();


    return (
      <section className="nav">

        <div className="logo-part-nav">

          <div className="logo-container">
            <img className="logo" src={logo} />
          </div>

          <div className="home-hikes-explore">

            <Link className="navlink" to="/home">
              Home
            </Link>
            {auth.username &&<Link className="navlink" to="/hikes">
              Hikes
            </Link>}
            <Link className="navlink" to="/explore">
              Explore
            </Link>
          </div>
        </div>
        <div className="profile-logout">
            
         {auth.username ? <><Link className="navlink" to="/profile">
          Profile
        </Link>
        <Link className="navlink" to="/logout">
            Logout
        </Link></> : <><Link className="navlink" to="/login">
          LogIn
        </Link>
        <Link className="navlink" to="/register">
            Register
        </Link></>}
        </div>
      </section>
    );
  
};
export default NavBar;
