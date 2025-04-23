import { baseApi } from "../api/baseApi";

const noticeManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createNotice: builder.mutation({
            query: (payload) => {
                return {
                    url: "/notice/create",
                    method: "POST",
                    body: payload,
                };
            },
            invalidatesTags: ["notice"],
        }),
        getAllNotices: builder.query({
            query: () => {
                return {
                    url: "/notice/admin",
                    method: "GET",
                };
            },
            providesTags: ["notice"],
        }),
        getAllNoticesUser: builder.query({
            query: (arg) => {
                const param = new URLSearchParams()

                if (arg) {
                    const key = Object.keys(arg)
                    const value = Object.values(arg)

                    for (let index = 0; index < key.length; index++) {
                        param.append(key[index], value[index] as string);
                    }
                }

                return {
                    url: "/notice/user",
                    method: "GET",
                    params: param
                };
            },
            providesTags: ["notice"],
        }),
        updateNoticeStatus: builder.mutation({
            query: (payload) => {
                return {
                    url: `/notice/update/${payload.id}`,
                    method: "PUT",
                    body: payload.updateInfo,
                };
            },
            invalidatesTags: ["notice"],
        }),
        deleteNotice: builder.mutation({
            query: (noticeId) => {
                return {
                    url: `/notice/delete/${noticeId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["notice"],
        }),
        countNotice: builder.query({
            query: () => {
                return {
                    url: `/notice/count`,
                    method: "GET",
                };
            },
            providesTags: ["notice"],
        }),
    }),
});

export const {
    useCreateNoticeMutation,
    useGetAllNoticesQuery,
    useGetAllNoticesUserQuery,
    useUpdateNoticeStatusMutation,
    useDeleteNoticeMutation,
    useCountNoticeQuery,
} = noticeManagementApi;
