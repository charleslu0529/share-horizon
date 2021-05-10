import React from "react";
import classes from "./user-details.module.scss";

function UserDetails(props) {
    return (
        <div className={classes.details}>
            <p className={classes.details__text}>
                <span className={classes.details__label}>Name:</span>{" "}
                {props.profile.name}
            </p>
            <p className={classes.details__text}>
                <span className={classes.details__label}>Email:</span>{" "}
                {props.profile.email}
            </p>
            <p className={classes.details__text}>
                <span className={classes.details__label}>Location:</span>{" "}
                {props.profile.location}
            </p>
            <p className={classes.details__text}>
                <span className={classes.details__label}>About:</span>{" "}
                {props.profile.about}
            </p>
        </div>
    );
}

export default UserDetails;
