import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const LoginPersist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  //fixes momery leak
  let isMounted = true;
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
         isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted=false;
  }, []);
  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default LoginPersist;
