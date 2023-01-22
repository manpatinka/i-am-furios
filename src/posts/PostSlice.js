import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
//npm install axios
import { axios } from 'axios';
//npm install date-fns --save
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        reactions: {
                            angry: 0,
                            crying: 0,
                            brokenHeart: 0,
                            blowMind: 0,
                            shit: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder 
          .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
          }) 
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'

            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString()
                post.reactions = {
                    angry: 0,
                    crying: 0,
                    brokenHeart: 0,
                    blowMind: 0,
                    shit: 0
                }

                return post;
            })

            //add any fetched posts to the array
            state.posts = state.posts.concat(loadedPosts);
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(addNewPost.fulfilled, (state, action) => {
            const sortedPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })

            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                angry: 0,
                crying: 0,
                brokenHeart: 0,
                blowMind: 0,
                shit: 0
            }

            state.posts.push(action.payload)
          })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice;