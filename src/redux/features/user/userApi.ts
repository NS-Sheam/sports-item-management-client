import { TResponse } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response: TResponse<any>) => response.data,
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetSingleUserQuery, useUpdateUserMutation, useUpdateUserRoleMutation } = userApi;
