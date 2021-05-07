import React from 'react';
import UserBanner from '../UserBanner/UserBanner';
import UserDesign from '../UserDesign/UserDesign';
import UserDetails from '../UserDetails/UserDetails';
import classes from './user-profile.module.scss';

function UserProfile(props) {
    return (
        <div className={classes.profile}>
            <UserBanner user={props.user}/>
            <div className={classes.profile__content}>
                <UserDetails user={props.user}/>
                <UserDesign />
            </div>
        </div>
    )
}

export default UserProfile;
