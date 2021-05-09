import React from "react";
import classes from "./user-banner.module.scss";
import api from "../../utils/api-details";
import { Link } from "react-router-dom";

function UserBanner(props) {
    let editProfile =
        props.user && props.user._id === props.match.params.userID ? (
            <Link
                to={`/edit/profile`}
                className={`button ${classes.userBanner__button}`}
            >
                Edit
            </Link>
        ) : (
            <></>
        );

    return (
        <div className={classes.userBanner}>
            <img
                src={`${api.apiUrl}/images/${props.profile.image}`}
                alt={props.profile.name}
                className={classes.userBanner__profile}
            />
            <div className={classes.userBanner__textContainer}>
                <h1 className={classes.userBanner__name}>{props.profile.name}</h1>
                {editProfile}
            </div>
        </div>
    );
}

export default UserBanner;
