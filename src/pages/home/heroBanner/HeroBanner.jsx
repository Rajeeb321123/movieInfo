// this is the big picture of a movie in main home page 


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

// for api calls
import useFetch from '../../../hooks/useFetch';

// redux toolkit
import { useSelector } from 'react-redux'

// components
import Img from "../../../components/lazyLoadImage/Img";
import Contentwrapper from '../../../components/contentWrapper/ContentWrapper'




const HeroBanner = () => {

    // INSTANCES
    const Navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming")

    // redux toolkit
    // for using the states from reducer slice 
    // home is the key in reducer
    const { url } = useSelector((state) => state.home);


    // STATES

    const [background, setBackground] = useState('');
    // search
    const [query, setQuery] = useState("");


    // METHODS

    // serach
    const searchQueryHandler = (event) => {
        // when we enter
        // making sure null value isnot provided and on only enter we move to serach
        if (event.key === "Enter" && query.length > 0) {

            // dynamic routing
            // as we know for serach page ,we had <Route path='/search/:query' element={<SearchResults/>}></Route>
            // dynamic value will be appended to url
            Navigate(`/search/${query}`);

        }
    };
    const searchQueryHandlerButton = () => {
        // making sure null value isnot provided and on only enter we move to serach
        if (query.length > 0) {

            // dynamic routing
            // as we know for serach page ,we had <Route path='/search/:query' element={<SearchResults/>}></Route>
            // dynamic value will be appended to url
            Navigate(`/search/${query}`);

        }
    };

    //USEEFFECT
    useEffect(() => {
        // bg will be full url for hero banner image and set background state to bg
        const bg =

            // from redux store
            url.backdrop +

            // look at network of inspect in browser and fing upcoming
            // .floor=no decimal value & *20 means (0 to 20)
            // backdrop_path is property of results in upcoming. look at network of inspect
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

        //set background state to bg url
        setBackground(bg);
    }, [data])


    //RETURN
    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background}  />
            </div>}

            <div className="opacity-layer"></div>
            <Contentwrapper>

                <div className="heroBannerContent">

                    <span className="title">Welcome.</span>

                    <span className="subTitle">
                        Millions of Movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    <div className="searchInput">

                        <input type="text"
                            placeholder='Search for a movie or tv show....'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler} />

                        <button onClick={searchQueryHandlerButton}>Search</button>
                    </div>

                </div>

            </Contentwrapper>
        </div>
    )
}

export default HeroBanner