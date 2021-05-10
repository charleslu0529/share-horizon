import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../utils/api-details";
import UserBanner from "../UserBanner/UserBanner";
import UserDesign from "../UserDesign/UserDesign";
import UserDetails from "../UserDetails/UserDetails";
import classes from "./user-profile.module.scss";

function UserProfile(props) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios
            .get(
                `${api.apiUrl}${api.usersEndpoint}/${props.match.params.userID}`
            )
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) =>
                console.error(
                    "Error getting user information on profile component",
                    error
                )
            );
    }, [props.location.pathname]);

    let profileInfo = profile ? (
        <div className={classes.profile}>
            <UserBanner {...props} profile={profile} />
            <div className={classes.profile__content}>
                <UserDetails {...props} profile={profile} />
                <UserDesign {...props} profile={profile} />
            </div>
        </div>
    ) : (
        <></>
    );

    return profileInfo;
}

export default UserProfile;
