import React, { useState } from "react";
import api from "../../utils/api-details";
import axios from "axios";
import classes from "./login.module.scss";

function Login(props) {

    const [state, setState] = useState({});

    const handleInputChange = (event) => {
        // event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const login = (event) => {
        event.preventDefault();
        axios
            .post(`${api.apiUrl}${api.usersEndpoint}/login`, {
                username: event.target.email.value,
                password: event.target.password.value,
            })
            .then(() => {
                props.updateUser();
                props.history.push("/");
            })
            .catch((error) => console.error("Failed logging user in", error));
    };
    return (
        <div className={classes.container}>
            <form
                className={classes.login}
                onSubmit={(event) => {
                    login(event);
                }}
                onChange={(event)=>{handleInputChange(event)}}
            >
                <h1 className={classes.login__title}>Login to your account</h1>
                <label htmlFor="" className={classes.login__label}>
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={classes.login__input}
                />
                <label htmlFor="" className={classes.login__label}>
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={classes.login__input}
                />
                <button
                    type="submit"
                    className={`button ${classes.login__submit}`}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
