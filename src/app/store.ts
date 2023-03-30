import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // channel: channelReducer, 追加...
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>