import useAuth from './useAuth';
import axios from '../api/axios';
// import axios from 'axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async (res) => {
        const response = await axios.get('/refresh', {
            withCredentials: true
            
        });
        // console.log(response)
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