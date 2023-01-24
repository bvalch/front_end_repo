import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/nav.css";
import logo from "../css/img/logo.png";
import useAxiosRefresh from "../hooks/useAxiosRefresh";




const NavBar = ({setHikes}) => {
  // const axiosRefresh = useAxiosRefresh();


  const { auth } = useAuth();

  // const handleHikesLinkClikc=async()=>{
  //   const controller = new AbortController();

  //   try {
  //     const response = await axiosRefresh.get("/hikes", {
  //       signal: controller.signal,
  //     });
  //     await setHikes(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }



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
          {auth.username && (
            <Link className="navlink" to="/hikes" >
              Hikes
            </Link>
          )}
          <Link className="navlink" to="/explore">
            Explore
          </Link>
        </div>
      </div>
      <div className="profile-logout">
        {auth.username ? (
          <><div className="welcomeback">{auth.username}</div>
            <Link className="navlink" to="/profile">
              Profile
            </Link>
            <Link className="navlink" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="navlink" to="/login">
              LogIn
            </Link>
            <Link className="navlink" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
};
export default NavBar;
