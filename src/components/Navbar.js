import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const { auth } = useAuth();

    if (auth.user === undefined) {
        return (
            <section className='nav'>
                <Link className='link' to="/login">Login</Link>
                <br />
                <Link className='link'to="/register">Register</Link>
                <br />
                <Link className='link'to="/">Home</Link>
            </section>
        )
    } else {
        return (
            <section className='nav'>


                <Link className='link' to="/logout">Logout</Link>
                <br />
                <Link className='link' to="/hikes">Hikes</Link>
                <br />
                <Link className='link' to="/profile">Profile</Link>
                <br />
                <Link className='link' to="/">Home</Link>

            </section>

        )
    }




};
export default NavBar;