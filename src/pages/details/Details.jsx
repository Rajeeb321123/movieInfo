import React from 'react'
import { useParams } from 'react-router-dom';



// page components
import DetailsBanner from './detailBanner/detailBanner';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';



import './style.scss';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';




const Details = () => {

  const { mediaType, id } = useParams();

  // getting all videos related to movie id
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
  
  return (
    <div>

      {/* [0] means only trailer */}
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

      {/* for cast component */}
      <Cast data={credits?.cast} loading={creditsLoading}/>

      {/* component for related videos */}
      <VideosSection data={data} loading={loading} />

      {/* Similar */}
      <Similar mediaType={mediaType} id={id}/>

      {/* Recommendation  */}
      <Recommendation  mediaType={mediaType} id={id}/>


    </div>
  )
}

export default Details