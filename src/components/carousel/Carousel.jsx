// for showing the movies  in trending, .....

import React, { useRef } from "react";


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// day.js is used for formatting the date recieved from api
import dayjs from "dayjs";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../genres/Genres";

// for providing rating in image
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";



const Carousel = ({ data, loading ,endpoint,title }) => {
  // loading we are getting from trendig.jsx is important to skeleton of movies images before they are totally fetched

  // INSTANCES
  const carouselContainer = useRef();
  const navigate = useNavigate();

  // redux toolkit
  const { url } = useSelector((state) => state.home)


  // METHODS

  // for navigation left and right of movies
  // here 20 means 20px
  const navigation = (dir) => {
  // we set dir from button  left or right
  
  const container = carouselContainer.current;

  const scrollAmount =
      dir === "left"
      // offsetwidth is just css width
          ? container.scrollLeft - (container.offsetWidth + 20)
          : container.scrollLeft + (container.offsetWidth + 20);

  container.scrollTo({
      left: scrollAmount,
    
      //smooth behavior ensure smooth scroll 
      behavior: "smooth",
  });

  };

  // for skeleton for image
  // below is just static html so, we can use them repeteadly , without writing same html again and again
  const skItem = () => {
    return (
        <div className="skeletonItem">
          {/* skeleton css class is in index.scss , look at it is for fake animation  */}
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};



  return (
    // we can select any element from return using useRef


    <div className="carousel">


      <ContentWrapper>
        {/* for title . in home page we add we didnt provide title but in details similar and recommendation we have use title of here */}
      {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />



        {/* Now for real carousel for movies and TV shows */}
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>


            {/*Map syntax is different . look at code . we are using {} for map because we need to do variable declararion */}
            {data?.map((item) => {
              // getting item or data poster path ,look at network 
              // we need url and url has been already saved in redux store from App.jsx
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                // we get item.id from api . look at network in browser
                <div
                  key={item.id}
                  // as param media_type or endpoint (if server error and we dont get media_type)
                  className="carouselItem" 
                  onClick={() =>
                    navigate(
                        `/${item.media_type || endpoint}/${
                            item.id
                        }`
                    )
                }
               >
                  <div className="posterBlock">

                    {/*for image*/}
                    <Img src={posterUrl} />
                    
                    {/*for rating*/}
                    {/* toFixed(1) will ensure only one value after decimal point */}
                    {/* vote_average in the data properties, look in the network */}
                    <CircleRating rating={item.vote_average.toFixed(1)}/>

                    {/* for showing genre */}
                    <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                  </div>

                  <div className="textBlock">

                    <span className="title">
                      {item.title || item.name}
                    </span>

                    <span className="date">
                      {/* using dayjs package to format the date recieved from api */}
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>

                  </div>

                </div>
              )
            })}

          </div>
        ) : (
          <div className="loadingSkeleton">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
      </div>
        )}
      </ContentWrapper>


    </div>
  )
}

export default Carousel