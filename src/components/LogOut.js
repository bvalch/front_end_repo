import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LogOut=()=>{
    const {auth,setAuth} = useAuth();
    const navigate=useNavigate();

    useEffect( async ()=>{

        try{
        const response = await axios.get('/logout',
        {
        withCredentials:true
        }
       
        
        )
        
        }catch(err){console.error(err)}
        setAuth('');
        navigate('/')
    
    
    },[])

    return(null)



};
export default LogOut;