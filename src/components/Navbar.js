import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const { auth } = useAuth();




    if (auth.user === undefined) {
        return (
            <section>
                <h1> Navigation</h1>
                <br />
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
                <br />
                <Link to="/">Home</Link>
            </section>
        )
    } else {
        return (
            <section>

                <h1> Navigation</h1>
                <br />
                <Link to="/register">Register</Link>
                <br />
                <Link to="/logout">Logout</Link>
                <br />
                <Link to="/hikes">Hikes</Link>
                <br />
                <Link to="/profile">Profile</Link>
                <br />
                <Link to="/">Home</Link>

            </section>

        )
    }




};
export default NavBar;