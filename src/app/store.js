import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../posts/PostSlice';

export const store = configureStore({
    reducer: postsReducer
})