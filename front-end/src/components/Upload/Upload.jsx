import React, { useState } from "react";
import classes from "./upload.module.scss";
import axios from "axios";
import api from "../../utils/api-details";

function Upload(props) {
    const [images, setImages] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [input, setInput] = useState({});
    const [featured, setFeatured] = useState("");

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

    const handleImageClick = (source) => {
        console.log(source);
    };

    const handleUpload = (event) => {
        event.preventDefault();

        const formImageData = new FormData();

        images.forEach((image) => {
            formImageData.append(
                `${image.image.lastModified}${image.image.name}`,
                image.image
            );
        });

        const imageUrls = [];
        const imageFiles = [];

        images.forEach((image) => {
            imageUrls.push(`${image.image.lastModified}${image.image.name}`);
            imageFiles.push(image.image);
        });

        const design = {
            title: input.title,
            description: input.description,
            userID: props.user._id,
            images: imageUrls,
            featured: featured,
        };

        console.log(imageFiles);

        // axios
        //     .post(`${api.apiUrl}${api.designsEndpoint}`, design)
        //     .then(() => {
        //         props.history.push("/");
        //     })
        //     .catch((error) =>
        //         console.error("Error uploading new design", error)
        //     );
    };

    let imagePreview = images ? (
        <>
            <div className={classes.upload__previewContainer}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={classes.upload__preview}
                        src={image.url}
                        onClick={() => handleImageClick(image)}
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
                    className={classes.upload__chooseFile}
                />
                {imagePreview}
            </form>
        </div>
    );
}

export default Upload;
