import React from 'react';
import UserBanner from '../UserBanner/UserBanner';
import UserDesign from '../UserDesign/UserDesign';
import UserDetails from '../UserDetails/UserDetails';
import classes from './user-profile.module.scss';

function UserProfile(props) {
    return (
        <div className={classes.profile}>
            <UserBanner {...props}/>
            <div className={classes.profile__content}>
                <UserDetails {...props}/>
                <UserDesign {...props}/>
            </div>
        </div>
    )
}

export default UserProfile;
