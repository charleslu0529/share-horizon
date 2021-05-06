import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./user-design.module.scss";
import { Link } from "react-router-dom";

function UserDesign(props) {
    const [designs, setDesigns] = useState([]);

    // useEffect(() => {
    //     axios.get();
    // }, [])
    let designsToShow = designs.map((item) => (
        <Link className={classes.designs__design}>
            <Link className={`button ${classes.designs__edit}`}>edit</Link>
        </Link>
    ));

    return <div className={classes.designs}>{designsToShow}</div>;
}

export default UserDesign;
