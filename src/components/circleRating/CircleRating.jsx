// for showing the rating
// where are using the CircularProgressbar package , its own css from its package

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            {/* using circular progressbar */}
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}

                // custom styling and using buildStyles of react-cirucluar-progressbar  and we need to just like below for that
                styles={buildStyles({
                    pathColor:
                        // making bad movies with rating<5 to red then avg movie  orange and good movie green
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;