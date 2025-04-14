import { apiSlice } from "../Api/ApiSlice";
import { userLoggin, userRegistion } from "./AuthSlice";

interface RegistionRespone {
  message: string;
  activeationToken: string;
}

interface RegistionBody {
  name: string;
  email: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registion: builder.mutation<RegistionRespone, RegistionBody>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const reuslt = await queryFulfilled;
        try {
          dispatch(
            userRegistion({
              token: reuslt?.data?.activeationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activaton: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "user/activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/user/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const reuslt = await queryFulfilled;
        try {
          dispatch(
            userLoggin({
              accessToken: reuslt?.data?.accessToken,
              user: reuslt?.data?.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    soicalAuth: builder.mutation({
      query: ({ name, email, avatar }) => ({
        url: "/user/social-auth",
        method: "POST",
        body: {
          name,
          email,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const reuslt = await queryFulfilled;
        try {
          dispatch(
            userLoggin({
              accessToken: reuslt?.data?.accessToken,
              user: reuslt?.data?.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegistionMutation,
  useActivatonMutation,
  useLoginMutation,
  useSoicalAuthMutation,
} = authApi;
