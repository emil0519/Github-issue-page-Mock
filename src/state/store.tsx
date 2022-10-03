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

// create slice to combine another reducer?

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// import { createStore } from "redux";
// import reducer from "./test-reducer";
// // import { pokemonApi } from "./issueRTK";
// import { configureStore } from "@reduxjs/toolkit";
// // Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from "@reduxjs/toolkit/query";

// export const store = configureStore({
//   reducer: {
//     // Add the generated reducer as a specific top-level slice
//     [pokemonApi.reducerPath]: pokemonApi.reducer,
//   },
//   // Adding the api middleware enables caching, invalidation, polling,
//   // and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(pokemonApi.middleware),
// });

// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

// // export const store = createStore(reducer);
