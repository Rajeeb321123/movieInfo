// here we set up the api call
// we are using auth token rather than api key






import axios from "axios";


const BASE_URL='https://api.themoviedb.org/3';

// it is alittle different for env import in Vite
const TMDB_TOKEN= import.meta.env.VITE_APP_TMDB_TOKEN;

// header for api call
// space is must after bearer
const headers={
    Authorization:"bearer " +TMDB_TOKEN
};


// param as optional , used in explore page for filters. param means parameter
export const fetchDataFromApi=async(url,params)=>{
    // we will be using different endpoints for movie , trending tv shows.....
    // endpoints are url and extra string are params .Watch  API docs of TMDB api 
    try{
        const {data} =await axios.get(BASE_URL+url,{
            // we can write headers:headers or like below as value asigned is same as asigned to
            headers,
            params
        })

        return data;

    }
    catch(err){
        console.log(err);
        return err;

    }
}



// tips:you will get two api call even if you  call it once because of react.strict mode in main.jsx which will check for response are same for 2 times
// tips : we didnt export it as default so fetchDataFromApi should be imported as {FetchDataFromAPi} in other file