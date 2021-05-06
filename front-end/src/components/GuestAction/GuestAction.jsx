import React from 'react';
import { Link } from 'react-router-dom';
import classes from './guest-action.module.scss';

function GuestAction() {
    return (
        <div className={classes.guestAction}>
            <Link to="/login" className={`button ${classes.guestAction__link}`}>Login</Link>
            <Link to="/sign-up" className={`button ${classes.guestAction__link}`}>Sign up</Link>
        </div>
    )
}

export default GuestAction
