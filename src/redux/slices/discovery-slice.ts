import { createSlice } from "@reduxjs/toolkit";

const discoverySlice = createSlice({
  name: "discovery",
  initialState: {
    value: null,
  },
  reducers: {
    setDiscoveryData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDiscoveryData } = discoverySlice.actions;

export default discoverySlice.reducer;
