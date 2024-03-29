import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./user-design.module.scss";
import { Link } from "react-router-dom";
import api from "../../utils/api-details";

function UserDesign(props) {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${api.apiUrl}${api.designsEndpoint}/user/${props.match.params.userID}`
            )
            .then((response) => {
                setDesigns(response.data);
            })
            .catch((error) =>
                console.error(
                    "Error trying to get user's designs in UserDesign Component",
                    error
                )
            );
    }, [props.profile]);

    const handleDelete = (event, id) => {
        event.preventDefault();

        axios
            .delete(`${api.apiUrl}${api.designsEndpoint}/${id}`)
            .then(() => {
                props.history.go(0);
            })
            .catch((error) => console.error("Could not delete"));
    };

    const isUserLoggedIn = props.user._id === props.match.params.userID;

    let designsToShow = designs.map((item) => (
        <div key={item._id} className={classes.designs__design}>
            <Link
                to={`/design/${item._id}`}
                className={classes.designs__designLink}
            >
                <img
                    src={`${api.apiUrl}/images/${item.featured}`}
                    alt={item.title}
                    className={classes.designs__image}
                />
            </Link>
            {isUserLoggedIn ? (
                <button className={`button ${classes.designs__delete}`} onClick={(event)=>{handleDelete(event, item._id)}}>
                    Delete
                </button>
            ) : (
                <></>
            )}

            <p className={classes.designs__designTitle}>{item.title}</p>
        </div>
    ));

    return (
        <div className={classes.designs}>
            <h2>Designs</h2>
            {isUserLoggedIn ? (
                <Link
                    to="/upload"
                    className={`button ${classes.designs__upload}`}
                >
                    Upload
                </Link>
            ) : (
                <></>
            )}

            <div className={classes.designs__container}>{designsToShow}</div>
        </div>
    );
}

export default UserDesign;
