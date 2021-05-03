import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import classes from "./header.module.scss";
import searchIcon from "../../assets/images/icons/search-icon.svg";
import GuestAction from "../GuestAction/GuestAction";

function Header(props) {

    let action = props.user ? <></>:<GuestAction />;

    return (
        <header className={classes.header}>
            <Logo />
            <form className={classes.header__search}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={classes.header__input}
                />
                <button className={classes.header__searchButton}>
                    <img
                        src={searchIcon}
                        alt="search"
                        className={classes.header__icon}
                    />
                </button>
            </form>

            {action}
        </header>
    );
}

export default Header;
