import { apiSlice } from "../Api/ApiSlice";

export const CourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/course/edit/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCourseWithoutPurchase: builder.query({
      query: () => ({
        url: `/course/without-purchase`,
        method: "GET",

        credentials: "include" as const,
      }),
    }),
    getSingleCourseWithoutPurchase: builder.query({
      query: (id) => ({
        url: `/course/without-purchase/${id}`,
        method: "GET",

        credentials: "include" as const,
      }),
    }),
    getSingleCoursePurchase: builder.query({
      query: (id) => ({
        url: `/course/purchase/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `/course/add-question`,
        method: "PUT",
        body: newQuestion,
        credentials: "include" as const,
      }),
    }),
    addNewAnswar: builder.mutation({
      query: (newAnswar) => ({
        url: `/course/add-answar`,
        method: "PUT",
        body: newAnswar,
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `/course/add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReviewReplay: builder.mutation({
      query: (newReplay) => ({
        url: `/course/add-replay`,
        method: "PUT",
        body: newReplay,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddReviewReplayMutation,
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetCourseWithoutPurchaseQuery,
  useGetSingleCourseWithoutPurchaseQuery,
  useGetSingleCoursePurchaseQuery,
  useAddNewQuestionMutation,
  useAddNewAnswarMutation,
  useAddReviewMutation,
} = CourseApi;
