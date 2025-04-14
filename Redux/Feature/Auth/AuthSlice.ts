import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistion: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userGetInfo: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;
    },
    userLoggin: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggOut: (state, action) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistion, userLoggin, userLoggOut, userGetInfo } =
  authSlice.actions;

export default authSlice.reducer;
