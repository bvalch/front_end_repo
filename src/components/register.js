import "../css/register.css";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3500/register",
        JSON.stringify({ user, pass }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUser("");
      setPass("");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="registerCont">
      <h1 className="h1-login-reg">Register an account</h1>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <br />

        <input
          type="text"
          className="login-reg-input"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          value={user}
        />
        <br />
        <label className="label" htmlFor="password">
          Password:
        </label>
        <br />

        <input
          type="password"
          className="login-reg-input"
          id="password"
          onChange={(e) => setPass(e.target.value)}
          required
          value={pass}
        />
        <br />
        <br />
        <button className="btn-create ">Sign Up</button>
      </form>
    </section>
  );
};

export default Register;
