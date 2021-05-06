import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.svg";
import classes from "./logo.module.scss";

function Logo() {
    return (
        <Link to="/" className={classes.logo}>
            <img src={logo} alt="Share Horizon Logo" className={classes.logo__image}/>
        </Link>
    );
}

export default Logo;
