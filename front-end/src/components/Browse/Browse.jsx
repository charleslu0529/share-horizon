import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./browse.module.scss";
import api from "../../utils/api-details";
import Card from "../Card/Card";

function Browse(props) {
    const [designs, setDesigns] = useState(null);

    useEffect(() => {
        axios
            .get(api.apiUrl + api.designsEndpoint)
            .then((response) => {
                setDesigns(response.data);
            })
            .catch((error) =>
                console.error(
                    "Error fething designs on Browse component",
                    error
                )
            );
    }, []);

    let designsToShow =
        props.searchTerm && designs
            ? designs.filter((design) =>
                  design.title.includes(props.searchTerm)
              )
            : designs;

    let cards = designsToShow ? (
        designsToShow.map((design) => <Card key={design._id} design={design} />)
    ) : (
        <></>
    );

    return (
        <div className={classes.browse}>
            <h1 className={classes.browse__title}>Browse Design</h1>
            <div className={classes.browse__container}>{cards}</div>
        </div>
    );
}

export default Browse;
