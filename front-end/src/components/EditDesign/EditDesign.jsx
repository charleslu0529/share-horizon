import React, { useState } from "react";
import api from "../../utils/api-details";

function EditDesign() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        axios
            .post(`${api.apiUrl}${api.usersEndpoint}/register`, {
                username: registerUsername,
                password: registerPassword,
            })
            .then((response) => console.log(response))
            .catch((error) => console.error("Failed registering user", error));
    };

    return <div></div>;
}

export default EditDesign;
