import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice'

export const store = configureStore({
  reducer: {
    // home is key, homeSlice is value. Key:value
    home:homeSlice

  },
});