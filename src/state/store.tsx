import { configureStore } from "@reduxjs/toolkit";
import { createIssueApi } from "../state/issueRTK";

export const store = configureStore({
  reducer: {
    [createIssueApi.reducerPath]: createIssueApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(createIssueApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

