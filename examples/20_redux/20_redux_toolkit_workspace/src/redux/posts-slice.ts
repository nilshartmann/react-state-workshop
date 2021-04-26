import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost, NewBlogPost } from "../types";
import { AppDispatch, AppThunk, AsyncAppThunk } from "./store";

type PostsState = {
  posts: BlogPost[];
  loading?: boolean;
  error?: string | null;
};

type AddPostAction = {
  newPost: BlogPost;
};

type PostLoadingFailed = {
  err: any;
};

type PostLoadingSucceeded = {
  posts: BlogPost[];
};

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false } as PostsState,
  reducers: {
    postsLoading(state) {
      state.loading = true;
      state.error = null;
    },
    postLoadingFailed(state, action: PayloadAction<PostLoadingFailed>) {
      state.loading = false;
      return { error: action.payload.err.toString(), posts: [] };
    },
    postLoadingSucceeded(_, action: PayloadAction<PostLoadingSucceeded>) {
      return {
        posts: action.payload.posts
      };
    },
    addPost(state, action: PayloadAction<AddPostAction>) {
      state.posts.unshift(action.payload.newPost);
      state.loading = false;
      state.error = null;
    }
  }
});

export default postsSlice.reducer;
const { postsLoading, postLoadingFailed, postLoadingSucceeded, addPost } = postsSlice.actions;

export function loadPosts(): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(postsLoading());
    fetch("http://localhost:7000/posts?slow")
      .then(response => response.json())
      .then(posts => {
        dispatch(postLoadingSucceeded({ posts }));
      })
      .catch(err => {
        dispatch(postLoadingFailed(err));
      });
  };
}

export function savePost(post: NewBlogPost): AsyncAppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(postsLoading());
    return fetch("http://localhost:7000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(newPost => {
        dispatch(addPost({ newPost }));
        // dispatch(openList());
      })
      .catch(err => {
        dispatch(postLoadingFailed({ err }));
      });
  };
}
