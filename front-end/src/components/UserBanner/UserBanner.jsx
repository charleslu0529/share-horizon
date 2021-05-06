import React from "react";
import classes from "./user-banner.module.scss";
import api from "../../utils/api-details";
import { Link } from "react-router-dom";

function UserBanner(props) {
    return (
        <div className={classes.userBanner}>
            <img
                src={`${api.apiUrl}/images/${props.user.image}`}
                alt={props.user.name}
                className={classes.userBanner__profile}
            />
            <div className={classes.userBanner__textContainer}>
                <h1 className={classes.userBanner__name}>{props.user.name}</h1>
                <Link
                    to={`/edit/profile`}
                    className={`button ${classes.userBanner__button}`}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
}

export default UserBanner;
