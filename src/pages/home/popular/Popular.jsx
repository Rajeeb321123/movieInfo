// for top rated in home page

import React, { useState } from 'react'


import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Popular= () => {

  //STATES
  // endpoint state is for trending data for days or week
  const [endpoint, setEndpoint] = useState("movie")

  //API CALL
  // fetching all(both movies and TV shows) data for day or week
  const { data, loading } = useFetch(`/${endpoint}/popular`);


  // METHODS
  // control of SwitchTab is possesed by parent Trending
  const onTabChange = (tab) => {
    // tab is got from switchTabs components 
    setEndpoint(tab === "Movies" ? "movie" : "tv");

  }



  return (
    <div className='carouselSection'>
      <ContentWrapper>

        {/* title */}
        <span className='carouselTitle'>
          What's Popular
        </span>

        {/* switch tabs */}
        {/* SwitchTab is just for switching Day and Week in UI */}
        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />


      </ContentWrapper>
      {/* Carousel where we show the movies and Tv shows */}
      {/* Unlike movie, tv show media type is hard to fetch so we send endpoint for media type for detail page if we click tv series*/}
      <Carousel data={data?.results} loading={loading}  endpoint={endpoint}/>

    </div>
  )
}

export default Popular