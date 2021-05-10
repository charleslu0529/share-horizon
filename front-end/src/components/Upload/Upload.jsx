import React, { useState } from "react";
import classes from "./upload.module.scss";
import axios from "axios";
import api from "../../utils/api-details";

function Upload(props) {
    const [images, setImages] = useState(null);
    const [input, setInput] = useState({});
    const [featured, setFeatured] = useState(0);

    const handleFileChange = (event) => {
        let newImages = [];

        for (let i = 0; i < event.target.files.length; i++) {
            newImages.push({
                image: event.target.files[i],
                url: URL.createObjectURL(event.target.files[i]),
            });
        }

        setImages(newImages);
    };

    const handleInputChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleImageClick = (index) => {
        setFeatured(index);
    };

    const handleUpload = (event) => {
        event.preventDefault();

        const formData = new FormData();

        images.forEach((image) => {
            formData.append(
                "imageFiles",
                image.image
            );
        });

        const imageFiles = [];

        images.forEach((image) => {
            imageFiles.push(image.image);
        });

        formData.set("title", input.title);
        formData.set("description", input.description);
        formData.set("userID", props.user._id);
        formData.set("featured", featured);

        axios
            .post(`${api.apiUrl}${api.designsEndpoint}`, formData)
            .then((response) => {
                console.log(response);
                props.history.push(`/profile/${props.user._id}`);
            })
            .catch((error) =>
                console.error("Error uploading new design", error)
            );
    };

    let imagePreview = images ? (
        <>
            <div className={classes.upload__previewContainer}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={classes.upload__preview}
                        src={image.url}
                        onClick={() => handleImageClick(index)}
                        alt="upload preview"
                    />
                ))}
            </div>
            <label className={classes.upload__label}>Title</label>
            <input
                type="text"
                placeholder="Design title"
                name="title"
                onChange={handleInputChange}
                className={classes.upload__input}
            />
            <label className={classes.upload__label}>Description</label>
            <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
                className={classes.upload__input}
            />
            <button
                type="submit"
                className={`button ${classes.upload__button}`}
            >
                Create
            </button>
        </>
    ) : (
        <></>
    );

    return (
        <div className={classes.upload}>
            <h1 className={classes.upload__Title}>Upload</h1>
            <form onSubmit={handleUpload} className={classes.upload__form}>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`${classes.upload__chooseFile} ${classes.upload__input}`}
                />
                {imagePreview}
            </form>
        </div>
    );
}

export default Upload;
