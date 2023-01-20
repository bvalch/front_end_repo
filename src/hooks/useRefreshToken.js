import useAuth from "./useAuth";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
  const { auth,setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    const decoded = response.data.acessToken ? jwtDecode(response.data.acessToken) : undefined;

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data);
      return { "username":decoded.username, acessToken: response.data.acessToken };
    });

    return response.data.acessToken;
  };

  return refresh;
};

export default useRefreshToken;
