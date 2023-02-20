// for home page
import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",



    initialState: {
        // for state

        url: {},

        // we will get genre's data from api call and we will save it here so we dont have to recall api
        genres: {},
    },




    reducers: {
        // for methods acting on state

        // state: initial states
        // actoin: it will be passed while using
        // configuration is part of TMDB api , look at the docs
        getApiConfiguration: (state, action) => {
            // here we are accessing the url state . and saving it with new value
            // action will be for  api call
            // payload will be data fetched
            state.url = action.payload;
        },


        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },


});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
