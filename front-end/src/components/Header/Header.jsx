import React from "react";
import Logo from "../Logo/Logo";
import classes from "./header.module.scss";
import searchIcon from "../../assets/icons/search-icon.svg";
import GuestAction from "../GuestAction/GuestAction";
import UserAction from "../UserAction/UserAction";

function Header(props) {

    let action = props.user ? <UserAction {...props} />:<GuestAction />;

    return (
        <header className={classes.header}>
            <Logo />
            <form className={classes.header__search} onSubmit={props.handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={classes.header__input}
                    name="search"
                />
                <button className={classes.header__searchButton} type="submit">
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
