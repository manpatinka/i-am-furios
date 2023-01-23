import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../posts/PostsSlice';

export const store = configureStore({
    reducer:  postsReducer
})