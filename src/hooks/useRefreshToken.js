import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            // console.log({...prev})
            return { ...prev, acessToken: response.data.acessToken }
        });
        // console.log(response.data.acessToken)
        // console.log(prev)
        return response.data.acessToken;
    }

    return refresh
};

export default useRefreshToken;