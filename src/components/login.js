import { useState, useContext } from "react";
import  axios  from '../api/axios'
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom'



const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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
            setAuth({ user, pass, acessToken });
            navigate("/")


        } catch (err) {
            console.error(err)

        }
        setUser("")
        setPass("")
    }


    return (
        <div className="registerCont">
            <h1>Login with your details</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input type='text'
                    id='username'
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    value={user}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <br />

                <input type='password'
                    id='password'
                    onChange={(e) => setPass(e.target.value)}
                    required
                    value={pass}
                />
                <br />
                <button>Sign In</button>

            </form>

        </div>

    )

};

export default Login;