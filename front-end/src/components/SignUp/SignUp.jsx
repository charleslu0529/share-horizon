import React, { useState } from "react";
import classes from "./sign-up.module.scss";
import axios from "axios";
import api from "../../utils/api-details";

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const signUp = (event) => {
        event.preventDefault();
        axios
            .post(api.apiUrl + api.usersEndpoint, {
                name: username,
                email: email,
                password: password,
            })
            .then(()=>{
                props.history.push("/");
            })
            .catch(error=>console.error("Error creating new user", error));
    };

    return (
        <div className={classes.container}>
            <form className={classes.signUp} onSubmit={(event)=>{signUp(event)}}>
                <h1 className={classes.signUp__title}>Create your account</h1>
                <label htmlFor="" className={classes.signUp__label}>
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={classes.signUp__input}
                />
                <label htmlFor="" className={classes.signUp__label}>
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={classes.signUp__input}
                />
                <label htmlFor="" className={classes.signUp__label}>
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={classes.signUp__input}
                />
                <button
                    type="submit"
                    className={`button ${classes.signUp__submit}`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SignUp;
