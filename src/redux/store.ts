// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice"; // Import your user slice

const rootReducer = combineReducers({
  user: userReducer, // Add other slices here if needed
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
