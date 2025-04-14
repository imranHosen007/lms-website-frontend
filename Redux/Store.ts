"use client";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Feature/Api/ApiSlice";
import AuthSlice from "./Feature/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: AuthSlice,
  },
  middleware: (getDefaultMilldeWare) =>
    getDefaultMilldeWare().concat(apiSlice.middleware),
});

const initalzeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initalzeApp();
