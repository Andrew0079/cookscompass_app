import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice"; // Import your user slice
import loadingReducer from "./slices/loading-slice";
import errorReducer from "./slices/error-slice";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
