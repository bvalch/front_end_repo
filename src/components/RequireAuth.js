import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
        auth? <Outlet />:<p>not autorised</p> 
    )

};

export default RequireAuth;