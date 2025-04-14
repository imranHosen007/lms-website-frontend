import { apiSlice } from "../Api/ApiSlice";

export const NotifactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifaction: builder.query({
      query: () => ({
        url: "/notifaction",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotifaction: builder.mutation({
      query: (id) => ({
        url: `/notifaction/update/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllNotifactionQuery, useUpdateNotifactionMutation } =
  NotifactionApi;
