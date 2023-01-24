import main from '../css/main.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';


const Layout = ({setHikes}) => {
    const { auth } = useAuth()

    return (
        <main className='App'>
                    <Navbar setHikes={setHikes} />

            <section className='message-cont'>

                {auth.user !== undefined ? `Welcome back ${auth.user} !` : null}

            </section>


           


            <Outlet />

        </main>

    )

};
export default Layout;