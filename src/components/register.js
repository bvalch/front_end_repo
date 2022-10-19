import register from '../css/register.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3500/register',
                JSON.stringify({ user, pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response.data)
            // console.log(response.accessToken)
            // console.log(JSON.stringify(response))
            setUser("")
            setPass("")
            navigate('/login')

        } catch (err) {
            console.error(err)

        }

    }



    return (
        <section className="registerCont">
            <h1>Register an account</h1>
            <br />

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
                <br />

                <button>Sign Up</button>
            </form>

        </section>

    )

};

export default Register;