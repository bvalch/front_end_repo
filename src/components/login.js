import { useState } from "react";
import  axios  from '../api/axios'
import useAuth from "../hooks/useAuth";
import {  useNavigate } from 'react-router-dom'



const Login = () => {
    const {auth,setAuth} = useAuth();
    const navigate = useNavigate();
    // const location = useLocation();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth',
                JSON.stringify({ user, pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const acessToken = response.data.acessToken;
            const userId=response.data.userId
            console.log(userId)
            setAuth({ user, acessToken,"userId":userId });
            navigate("/home")


        } catch (err) {
            console.error(err)

        }
        setUser("")
        setPass("")
    }


    return (
        <section className="registerCont">
            <h1 className="h1-login-reg">Login with your details</h1>
            <form onSubmit={handleSubmit}>
                <label className='label' htmlFor="username">Username:</label>
                <br />
                <input type='text'
                className="login-reg-input"
                    id='username'
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    value={user}
                />
                <br />
                <label className='label' htmlFor="password">Password:</label>
                <br />

                <input type='password'
                className="login-reg-input"
                    id='password'
                    onChange={(e) => setPass(e.target.value)}
                    required
                    value={pass}
                />
                <br />
                <br/>
                <button className='btn-create '>Sign In</button>
                <br/>
                <div></div>

            </form>

        </section>

    )

};

export default Login;