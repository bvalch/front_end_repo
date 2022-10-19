import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async (res) => {
        const response = await axios.get('/refresh', {
            withCredentials: true
            
        });
        setAuth(prev => {
            return { ...prev, acessToken: response.data.acessToken };
        });
       
        return response.data.acessToken;
    };

    return refresh;
};



export default useRefreshToken;