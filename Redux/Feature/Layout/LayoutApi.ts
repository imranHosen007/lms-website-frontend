import { apiSlice } from "../Api/ApiSlice";

export const LayoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query({
      query: (type) => ({
        url: `/layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    EditLayout: builder.mutation({
      query: (data) => ({
        url: `/layout`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetLayoutQuery, useEditLayoutMutation } = LayoutApi;
