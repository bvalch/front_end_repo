import main from '../css/main.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';


const Layout = () => {
    const {auth} = useAuth()
    // console.log(auth.user)

    return (

        <main className='App'>
            <section className='message-cont'>
            {auth.user !== undefined ? `Welcome back ${auth.user} !` : 'Please Log In with your account'}
            </section>
            <Navbar />

            

            <Outlet />

        </main>

    )

};
export default Layout;