import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = () => {
  const { auth } = useAuth();
  // const location = useLocation();
  const decoded = auth?.acessToken ? jwt_decode(auth.acessToken) : undefined;
  // console.log(decoded)

  return decoded.username !== undefined ? (
    <Outlet />
  ) : (
    <p className="auth-msg">
      You are not authorized to view the content of this page. Please Log In or
      Register
    </p>
  );
};

export default RequireAuth;
