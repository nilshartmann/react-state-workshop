import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDraft, setDraftBody, setDraftTitle } from "../redux/editor-slice";
import { NewBlogPost } from "../types";
import { useAppDispatch } from "./redux-hooks";
type PostEditorProps = {
  onSavePost(post: NewBlogPost): void;
};

export default function PostEditor(props: PostEditorProps) {
  // todo: change to useDispatch
  const dispatch = useDispatch();

  // todo: remove ts-ignore...
  // @ts-ignore
  const title = useSelector(state => state.editor.title);
  // todo: remove ts-ignore...
  // @ts-ignore
  const body = useSelector(state => state.editor.body);

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  function clear() {
    dispatch(clearDraft());
  }

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <label>
        Title
        <input
          value={title}
          onChange={e => dispatch(setDraftTitle({ title: e.currentTarget.value }))}
        />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea
          value={body}
          onChange={e => dispatch(setDraftBody({ body: e.currentTarget.value }))}
        />
      </label>
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
      <button
        disabled={saveButtonDisabled}
        onClick={() => {
          const draft = { title, body };
          dispatch(clearDraft());
          props.onSavePost(draft);
        }}
      >
        Save Post
      </button>
    </div>
  );
}

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};

function Message({ msg, type = "error" }: MessageProps) {
  const style =
    type === "error" ? ({ color: "red", fontWeight: "bold" } as const) : { color: "green" };

  return <p style={style}>{msg}</p>;
}
