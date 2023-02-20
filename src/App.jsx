import { useState,useEffect } from 'react'

import { fetchDataFromApi } from './utils/api';

// redux toolkit
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';

// Router
import { BrowserRouter,Route,Routes } from 'react-router-dom';


// components and pages
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';



function App() {
  // for calling the action in reducer
  const dispatch = useDispatch();

  // for using the states from reducer slice 
  // home is the key in reducer
  const {url}= useSelector((state)=>state.home);
  



  // just testing
  // const apiTesting=()=>{
  //   fetchDataFromApi('/movie/popular').then((res)=>{
  //     console.log(res);
      
  //     // providing action of reducer with res payload
  //     dispatch(getApiConfiguration(res));
  //   });
    
  // };
  
  
  
  const fetchApiConfig=()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);


      // url object
      const url={
        // original is the size . look at network of inspect in browser
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",
      }
      
      // providing action of reducer with url payload
      dispatch(getApiConfiguration(url));
    });
    
  };


  useEffect(()=>{
    fetchApiConfig();
    genresCall();
    
  },[]);



  // for getting all genres and saving in redux store:homeSlice
  // while in home page , for showing genre in trending , we need to do two api call for Movies and Tv shows . genre is stored in different way in both movie and tv show in Tdmb database
  // for multiple api calls we use promise.all 
  const genresCall =async()=>{
    let promises =[]
    let endPoints =["tv","movie"]
    // allGenre is obj . initially it is empty but not after mappin api calls
    let allGenres={}

    endPoints.forEach((endpoint)=>{
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`))
    })

    // why we use promise.all: it will return reponse of both Tv and Movie calls at same time
    const data =await Promise.all(promises)
    // console.log(data);

    // below (({genre})) means it is a direct destructure without like  item.genre
    data.map(({genres})=>{

      return genres.map((item) => (allGenres[item.id]=item))
      // here after (allGenres[item.id]=item) ,one of many objects will looks this 53: {…}. where item.id become obj name and item content become obj content
    });
    // console.log(allGenres)

    // dispatching allgenres to store in redux
    dispatch (getGenres(allGenres));
  }
 

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
          <Route path='/' element={<Home/>}></Route>

          {/* dynamic routing */}
          {/* /:value  is dynamic value for url */}
          <Route path='/:mediaType/:id' element={<Details/>}></Route>
          <Route path='/search/:query' element={<SearchResult/>}></Route>
          <Route path='/explore/:mediaType' element={<Explore/>}></Route>

          {/*  '/*' routes means if the none of the above routes are choose then /* will be open  */}
          <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>


  )
}

export default App


// install redux dev tools in chrome extension to check redux working properly
// tip:?. means optional chaining. ?. will make sure later code willnot be executed so it wouldn't the break the app
