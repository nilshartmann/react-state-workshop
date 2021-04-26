import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import viewReducer from "./view-slice";
import editorReducer from "./editor-slice";
import postsReducer from "./posts-slice";

const rootReducer = combineReducers({
  view: viewReducer,
  editor: editorReducer,
  posts: postsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action<string>>;
export type AsyncAppThunk<R = void> = ThunkAction<Promise<R>, RootState, unknown, Action<string>>;
export type AppStore = typeof store;

export default store;
