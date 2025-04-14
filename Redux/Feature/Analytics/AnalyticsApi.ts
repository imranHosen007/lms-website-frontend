import { apiSlice } from "../Api/ApiSlice";

export const AnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: "/analytics/get-order",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCourseAnalyticsQuery,
  useGetUserAnalyticsQuery,
  useGetOrderAnalyticsQuery,
} = AnalyticsApi;
