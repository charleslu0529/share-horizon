import React from 'react';
import classes from './user-details.module.scss';

function UserDetails(props) {
    return (
        <div className={classes.details}>
            <p>Name: {props.profile.name}</p>
            <p>Email: {props.profile.email}</p>
            <p>Location: {props.profile.location}</p>
            <p>About: {props.profile.bio}</p>
        </div>
    )
}

export default UserDetails
