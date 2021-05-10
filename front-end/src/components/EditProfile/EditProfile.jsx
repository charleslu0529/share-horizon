import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./edit-profile.module.scss";
import api from "../../utils/api-details";

function EditProfile(props) {
    const [input, setInput] = useState({
        name: props.user.name,
        email: props.user.email,
        location: props.user.location,
        about: props.user.about,
    });

    const [imageUrl, setImageUrl] = useState(
        `${api.apiUrl}/images/${props.user.image}`
    );

    const handleInputChange = (event) => {
        if (event.target.type === "file") {
            setInput({
                ...input,
                [event.target.name]: event.target.files[0],
            });
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            
        } else {
            setInput({
                ...input,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.set("image", input.image);
        formData.set("name", input.name);
        formData.set("email", input.email);
        formData.set("location", input.location);
        formData.set("about", input.about);

        // console.log(input.about);

        axios
            .put(`${api.apiUrl}${api.usersEndpoint}/${props.user._id}`, formData)
            .then((response) => {
                props.updateUser();
                props.history.push("/");
            })
            .catch((error) =>
                console.error(
                    "Error when updating user information on Edit Profile component",
                    error
                )
            );
    };

    return (
        <div className={classes.edit}>
            <form
                className={classes.edit__form}
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
            >
                <div className={classes.edit__container}>
                    <img
                        src={imageUrl}
                        alt={props.user.name}
                        className={classes.edit__image}
                    />
                    <label className={classes.edit__label}>
                        Change Profile Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        className={classes.edit__upload}
                    />
                </div>
                <div className={classes.edit__containerRight}>
                    <label className={classes.edit__label}>Name</label>
                    <input
                        type="text"
                        name="name"
                        className={classes.edit__input}
                        defaultValue={props.user.name}
                    />
                    <label className={classes.edit__label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        className={classes.edit__input}
                        defaultValue={props.user.email}
                    />
                    <label className={classes.edit__label}>Location</label>
                    <input
                        type="text"
                        name="location"
                        className={classes.edit__input}
                        defaultValue={props.user.location}
                    />
                    <label className={classes.edit__label}>About</label>
                    <textarea
                        name="about"
                        rows="4"
                        className={`${classes.edit__input} ${classes.edit__textarea}`}
                        defaultValue={props.user.about}
                    ></textarea>
                    <button
                        type="submit"
                        className={`button ${classes.edit__button}`}
                    >
                        Update Information
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
