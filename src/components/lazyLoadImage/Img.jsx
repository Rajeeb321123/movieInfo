// for lazy load every image in our website

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
        // src and classname for css will be sent as props from other files calling this file
            className={className || ""}
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default Img;