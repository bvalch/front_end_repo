import { useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.user !== undefined ? <Outlet />:<p>You are not authorized</p> 
    )

};

export default RequireAuth;