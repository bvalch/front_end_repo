import { useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.user !== undefined ? <Outlet />:<p className='auth-msg'>You are not authorized to view the content of this page. 
        Please Log In or Register</p> 
    )

};

export default RequireAuth;