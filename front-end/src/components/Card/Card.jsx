import React from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api-details";
import classes from "./card.module.scss";

function Card(props) {
    return (
        <div className={classes.card}>
            <Link
                to={`/design/${props.design._id}`}
                className={classes.card__link}
            >
                <img
                    src={`${api.apiUrl}/images/${props.design.featured}`}
                    alt={props.design.title}
                    className={classes.card__image}
                />
            </Link>
            <div className={classes.card__details}>
                <Link
                    to={`/profile/${props.design.userID}`}
                    className={classes.card__link}
                >
                    <img
                        src={`${api.apiUrl}/images/${props.design.userImage}`}
                        alt={props.design.userName}
                        className={classes.card__user}
                    />
                </Link>
                <Link
                    to={`/design/${props.design._id}`}
                    className={`${classes.card__link} ${classes.card__title}`}
                >
                    {props.design.title}
                </Link>
            </div>
        </div>
    );
}

export default Card;
