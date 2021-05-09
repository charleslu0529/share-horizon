import React, { useEffect, useState } from "react";
import api from "../../utils/api-details";
import axios from "axios";
import classes from "./design.module.scss";

function Design(props) {
    const [design, setDesign] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        axios
            .get(`${api.apiUrl}${api.designsEndpoint}/${props.match.params.id}`)
            .then((response) => {
                setDesign(response.data);
                setMainImage(response.data.featured);
            })
            .catch((error) =>
                console.error("Error getting Design on Design Component", error)
            );
    }, []);

    const handleImageHover = (imageSource) => {
        setMainImage(imageSource);
    }

    let images = design ? design.images.map((image) => (
        <img
            key={image}
            src={`${api.apiUrl}/images/${image}`}
            alt={design.title}
            className={classes.design__image}
            onMouseEnter={()=>{handleImageHover(image)}}
        />
    )) : <></>;

    return (
        design ? 
        <div className={classes.design}>
            <h1 className={classes.design__title}>{design.title}</h1>
            <img
                src={`${api.apiUrl}/images/${mainImage}`}
                alt={design.title}
                className={classes.design__mainImage}
            />
            <div className={classes.design__selection}>{images}</div>
            <div className={classes.design__info}>
                <h2 className={classes.design__heading}>About this design</h2>
                <p className={classes.design__description}>
                    {design.description}
                </p>
            </div>
        </div> : <></>
    );
}

export default Design;
