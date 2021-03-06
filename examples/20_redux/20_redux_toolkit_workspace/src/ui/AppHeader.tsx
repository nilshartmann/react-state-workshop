import React from "react";
import { clearDraft } from "../redux/editor-slice";
import { openList } from "../redux/view-slice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

export default function AppHeader() {
  const dispatch = useAppDispatch();

  const hasDraft = useAppSelector(state => state.editor.title !== "" || state.editor.body !== "");

  return (
    <header>
      <h1 className="Link">React Training Blog</h1>
      <span style={{ textAlign: "right" }}>
        <button onClick={() => dispatch(openList())}>Home</button>
        <button
          disabled={!hasDraft}
          style={{ marginLeft: "0.5rem" }}
          onClick={() => dispatch(clearDraft())}
        >
          Clear Draft
        </button>
      </span>
    </header>
  );
}
