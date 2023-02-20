// for showing trending movies in home

import React, { useState } from 'react'


import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Trending = () => {

  //STATES
  // endpoint state is for trending data for days or week
  const [endpoint, setEndpoint] = useState("day")

  //API CALL
  // fetching all(both movies and TV shows) data for day or week
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);


  // METHODS
  // control of SwitchTab is possesed by parent Trending
  const onTabChange = (tab) => {
    // tab is got from switchTabs components 
    setEndpoint(tab === "Day" ? "day" : "week")

  }



  return (
    <div className='carouselSection'>
      <ContentWrapper>

        {/* title */}
        <span className='carouselTitle'>
          Trending
        </span>

        {/* switch tabs */}
        {/* SwitchTab is just for switching Day and Week in UI */}
        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />


      </ContentWrapper>
      {/* Carousel where we show the movies and Tv shows */}
      <Carousel data={data?.results} loading={loading} />

    </div>
  )
}

export default Trending