import React from "react";
import axios from "axios";
import classes from "./user-action.module.scss";
import api from "../../utils/api-details";
import { Link, useHistory } from "react-router-dom";

function UserAction(props) {

    const history = useHistory();
    const handleLogOut = (event) => {
        event.preventDefault();
        axios
            .post(`${api.apiUrl}${api.usersEndpoint}/logout`)
            .then(() => {
                props.updateUser();
                history.push("/");
            })
            .catch((error) =>
                console.error("Error when trying to log out", error)
            );
    };
    return (
        <div className={classes.userAction}>
            <button
                onClick={(event) => {
                    handleLogOut(event);
                }}
                className={`${classes.userAction__signOut} button`}
            >
                Sign Out
            </button>
            <Link
                to={`/profile/${props.user._id}`}
                className={classes.userAction__profile}
            >
                <img
                    src={`${api.apiUrl}/images/${props.user.image}`}
                    alt={props.user.name}
                    className={classes.userAction__profile}
                />
            </Link>
        </div>
    );
}

export default UserAction;
