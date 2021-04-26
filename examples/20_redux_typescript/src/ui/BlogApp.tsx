import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import LoadingIndicator from "./LoadingIndicator";
import { openEditor, openList } from "../redux/view-slice";
import { loadPosts, savePost } from "../redux/posts-slice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { NewBlogPost } from "../types";

export default function BlogApp() {
  const view = useAppSelector(state => state.view);
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.posts.loading);
  const posts = useAppSelector(state => state.posts.posts);

  React.useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  function save(newPost: NewBlogPost) {
    dispatch(savePost(newPost)).then(() => dispatch(openList()));
  }

  if (loading) {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  if (view === "LIST") {
    return <PostList posts={posts} onAddPost={() => dispatch(openEditor())} />;
  }

  return <PostEditor onSavePost={save} />;
}
