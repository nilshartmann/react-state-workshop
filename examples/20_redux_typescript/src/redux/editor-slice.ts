import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetDraftBody = {
  body: string;
};

type SetDraftTitle = {
  title: string;
};

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    title: "",
    body: ""
  },
  reducers: {
    // für jeden definierten reducer wird zur Laufzeit eine action-Creator-Funktion erzeugt
    clearDraft: function () {
      // man kann komplett neuen State zurückgeben
      return { title: "", body: "" };
    },

    // Der Wert, der der erzeugten action-creator-Funktion übergeben wird, wird
    // der action als 'payload'-Property hinzugefügt
    setDraftBody: function (state, action: PayloadAction<SetDraftBody>) {
      // Hier können wir mutable code hinschreiben 😊
      state.body = action.payload.body;
    },
    setDraftTitle: function (state, action: PayloadAction<SetDraftTitle>) {
      // Hier können wir mutable code hinschreiben 😊
      state.title = action.payload.title;
    }
  }
});

export default editorSlice.reducer;

export const { clearDraft, setDraftBody, setDraftTitle } = editorSlice.actions;
