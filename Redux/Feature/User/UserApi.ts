import { apiSlice } from "../Api/ApiSlice";

export const UserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/user/change-avatar",
        method: "PUT",
        body: avatar,
        credentials: "include" as const,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ name }) => ({
        url: "/user/update-information",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/user/change-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",

        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/user/update-role`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = UserApi;
