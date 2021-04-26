import { createSlice } from "@reduxjs/toolkit";

const emptyDraftPost = {
  title: "",
  body: ""
};
const initialPost = emptyDraftPost();

export function clearDraft() {
  return {
    type: "editor/clearDraft"
  };
}

export function setDraftBody(body) {
  return {
    type: "editor/setDraftBody",
    body
  };
}

export function setDraftTitle(title) {
  return {
    type: "editor/setDraftTitle",
    title
  };
}

export default function editorReducer(state = initialPost, action) {
  switch (action.type) {
    case "editor/clearDraft":
      return emptyDraftPost();
    case "editor/setDraftBody":
      return { ...state, body: action.body };
    case "editor/setDraftTitle":
      return { ...state, title: action.title };
    default:
      return state;
  }
}
