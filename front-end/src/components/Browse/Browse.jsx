import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./browse.module.scss";
import api from "../../utils/api-details";
import Card from "../Card/Card";

function Browse() {
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

    let cards = designs ? (
        designs.map((design) => <Card key={design._id} design={design} />)
    ) : (
        <></>
    );

    return (
        <div className={classes.browse}>
            <h1 className={classes.browse__title}>Browse Design</h1>
            {cards}
        </div>
    );
}

export default Browse;
