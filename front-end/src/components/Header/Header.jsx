import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import classes from "./header.module.scss";

function Header(props) {
    return (
        <header className={classes.header}>
            <Logo />
            <form className={classes.header__search}>
                <input type="text" placeholder="Search..." className={classes.header__input}/>
            </form>
        </header>
    );
}

export default Header;
