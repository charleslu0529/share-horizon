import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.svg";
import classes from './logo.module.scss';

function Logo() {
    return (
        <Link to="/">
                <img src={logo} alt="Share Horizon Logo" />
            </Link>
    )
}

export default Logo
