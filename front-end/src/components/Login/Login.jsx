import React, { useState } from "react";
import api from "../../utils/api-details";
import axios from "axios";
import classes from "./login.module.scss";

function Login() {

    const login = (event) => {
        event.preventDefault();
        axios
            .post(`${api.apiUrl}${api.usersEndpoint}/login`, {
                username: event.target.email,
                password: event.target.password,
            })
            .then((response) => console.log(response))
            .catch((error) => console.error("Failed registering user", error));
    };
    return (
        <div className={classes.container}>
            <form
                className={classes.login}
                onSubmit={(event) => {
                    login(event);
                }}
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
