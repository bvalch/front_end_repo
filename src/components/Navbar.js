import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/nav.css";
import logo from "../css/img/logo.png";

const NavBar = () => {
  const { auth } = useAuth();

  if (auth.username === undefined) {
    return (
      <section className="nav">
        <Link className="button_slide slide_left" to="/login">
          LogIn
        </Link>
        <Link className="button_slide slide_left" to="/register">
          Register
        </Link>
      </section>
    );
  } else {
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
            <Link className="navlink" to="/hikes">
              Hikes
            </Link>
            <Link className="navlink" to="/explore">
              Explore
            </Link>
          </div>
        </div>

        <Link className="button_slide slide_left" to="/profile">
          Profile
        </Link>
        <Link className="button_slide slide_left" to="/logout">
          Logout
        </Link>
      </section>
    );
  }
};
export default NavBar;
