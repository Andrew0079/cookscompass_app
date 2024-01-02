import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "loading",
  initialState: {
    value: {
      error: null,
      visible: false,
    },
  },
  reducers: {
    setError: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
