import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const NavBar = () => {

    // useEffect(()=>{

    // },[])
    const { auth } = useAuth();

    <div class="button_slide slide_left">BUTTON: SLIDE INSIDE </div>

    if (auth.username === undefined) {
        return (
            <section className='nav'>
                <Link className='button_slide slide_left' to="/login">LogIn</Link>
                <br />
                <Link className='button_slide slide_left' to="/register">Register</Link>

            </section>
        )
    } else {
        return (
            <section className='nav'>


                <Link className='button_slide slide_left' to="/home">Home</Link>
                <br />
                <Link className='button_slide slide_left' to="/hikes">Hikes</Link>
                <br />
                <Link className='button_slide slide_left' to="/profile">Profile</Link>
                <br />

                <Link className='button_slide slide_left' to="/logout">Logout</Link>

            </section>

        )
    }




};
export default NavBar;