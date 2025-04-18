import { baseApi } from "../api/baseApi";

const teacherManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeacher: builder.mutation({
            query: (payload) => {
                return {
                    url: "/teacher/create",
                    method: "POST",
                    body: payload,
                };
            },
            invalidatesTags: ["teacher"],
        }),
        getAllTeacherAdmin: builder.query({
            query: () => {
                return {
                    url: "/teacher/admin",
                    method: "GET",
                };
            },
            providesTags: ["teacher"],
        }),
        getAllTeacherUser: builder.query({
            query: () => {
                return {
                    url: "/teacher/user",
                    method: "GET",
                };
            },
            providesTags: ["teacher"],
        }),
        updateTeacher: builder.mutation({
            query: (payload) => {
                return {
                    url: `/teacher/update/${payload.id}`,
                    method: "PUT",
                    body: payload.updateInfo,
                };
            },
            invalidatesTags: ["teacher"],
        }),
        deleteTeacher: builder.mutation({
            query: (teacherId) => {
                return {
                    url: `/teacher/delete/${teacherId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["teacher"],
        }),
        countTeacher: builder.query({
            query: () => {
                return {
                    url: `/teacher/count`,
                    method: "GET",
                };
            },
            providesTags: ["teacher"],
        }),
    }),
});

export const {
    useCreateTeacherMutation,
    useGetAllTeacherAdminQuery,
    useGetAllTeacherUserQuery,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useCountTeacherQuery
} = teacherManagementApi;
