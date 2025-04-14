import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userGetInfo, userLoggin, userLoggOut } from "../Auth/AuthSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "/user/refresh-token",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "/user/me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const reuslt = await queryFulfilled;
        try {
          dispatch(
            userGetInfo({
              user: reuslt?.data?.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.query({
      query: (data) => ({
        url: "/user/logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery, useLogoutUserQuery } =
  apiSlice;
