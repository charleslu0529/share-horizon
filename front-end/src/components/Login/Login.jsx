import React, { useState } from "react";
import api from "../../utils/api-details";

function Login() {

    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const login = () => {
        axios
            .post(`${api.apiUrl}${api.usersEndpoint}/login`, {
                username: loginUsername,
                password: loginPassword,
            })
            .then((response) => console.log(response))
            .catch((error) => console.error("Failed registering user", error));
    };
    return <div></div>;
}

export default Login;
