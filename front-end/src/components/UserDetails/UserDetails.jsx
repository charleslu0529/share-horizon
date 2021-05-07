import React from 'react';
import classes from './user-details.module.scss';

function UserDetails(props) {
    return (
        <div className={classes.details}>
            <p>Name: {props.user.name}</p>
            <p>Email: {props.user.email}</p>
            <p>Location: {props.user.location}</p>
            <p>About: {props.user.bio}</p>
        </div>
    )
}

export default UserDetails
