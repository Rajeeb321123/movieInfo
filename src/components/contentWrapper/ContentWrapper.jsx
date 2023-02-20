//just to make our content centered and having some gap on both sides
//just to minimize repetitive code



import React from "react";



import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;

