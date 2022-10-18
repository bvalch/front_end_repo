import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';


const Layout = () => {
    const {auth} = useAuth()
    // console.log(auth.user)

    return (

        <main className='App'>
            <Navbar />
            {auth.user !== undefined ? <p>Welcome back {auth.user}</p> : <p>Please Log In with your account</p>}

            <Outlet />

        </main>

    )

};
export default Layout;