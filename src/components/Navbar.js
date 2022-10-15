import {Link} from 'react-router-dom'

const NavBar = () => {


    return (
        <section>
            <h1> Navigation</h1>
            <br/>
            <Link to = "/login">Login</Link>
            <br/>
            <Link to = "/register">Register</Link>
            <br/>
            <Link to = "/hikes">Hikes</Link>
            <br/>
            <Link to = "/profile">Profile</Link>





        </section>
    )


};
export default NavBar;