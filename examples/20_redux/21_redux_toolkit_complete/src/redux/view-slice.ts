// "classic" Redux action creator and reducer can still be used in RTK

export function openEditor() {
  return {
    type: "mode/openEditor"
  } as const;
}

export function openList() {
  return {
    type: "mode/openList"
  } as const;
}

export type OpenEditorAction = ReturnType<typeof openEditor>;
export type OpenListAction = ReturnType<typeof openList>;

export default function viewReducer(state = "LIST", action: OpenEditorAction | OpenListAction) {
  switch (action.type) {
    case "mode/openEditor":
      return "ADD";
    case "mode/openList":
      return "LIST";
    default:
  }
  return state;
}
