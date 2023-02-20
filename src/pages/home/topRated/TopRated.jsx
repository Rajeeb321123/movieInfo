import React, { useState } from 'react'


import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const TopRated= () => {

  //STATES
  // endpoint state is for trending data for days or week
  const [endpoint, setEndpoint] = useState("movie")

  //API CALL
  // fetching all(both movies and TV shows) data for day or week
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);


  // METHODS
  // control of SwitchTab is possesed by parent Trending
  const onTabChange = (tab) => {
    // tab is got from switchTabs components 
    setEndpoint(tab === "Movies" ? "movie" : "tv")

  }



  return (
    <div className='carouselSection'>
      <ContentWrapper>

        {/* title */}
        <span className='carouselTitle'>
          TopRated
        </span>

        {/* switch tabs */}
        {/* SwitchTab is just for switching Day and Week in UI */}
        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />


      </ContentWrapper>
      {/* Carousel where we show the movies and Tv shows */}
      {/* dont forget to put endpoint as tv show generally donot provide media_type from api so, we have to do it explicitly */}
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

    </div>
  )
}

export default TopRated