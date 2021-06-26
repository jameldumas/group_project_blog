import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/login", { 
            email: email, 
            password: password,
        },
        {
            withCredentials: true
        }
        )
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
        });
    };

    return (
        <div>
        <h2>Login</h2>
        <p className="error-text">{errorMessage ? errorMessage : ""}</p>
        <form onSubmit={login}>
            <div>
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="center">
            <button 
                type="submit"
            >Sign In</button>
            </div>
        </form>
        </div>
    );
};

export default Login;
