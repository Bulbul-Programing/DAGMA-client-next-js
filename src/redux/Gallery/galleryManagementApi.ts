import { baseApi } from "../api/baseApi";

const galleryManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createGallery: builder.mutation({
            query: (payload) => {
                return {
                    url: "/gallery/create",
                    method: "POST",
                    body: payload,
                };
            },
            invalidatesTags: ["gallery"],
        }),
        getAllGalleryAdmin: builder.query({
            query: () => {
                return {
                    url: "/gallery/admin",
                    method: "GET",
                };
            },
            providesTags: ["gallery"],
        }),
        getAllGalleryUser: builder.query({
            query: () => {
                return {
                    url: "/gallery/user",
                    method: "GET",
                };
            },
            providesTags: ["gallery"],
        }),
        updateGallery: builder.mutation({
            query: (payload) => {
                return {
                    url: `/gallery/update/${payload.id}`,
                    method: "PUT",
                    body: payload.updateInfo,
                };
            },
            invalidatesTags: ["gallery"],
        }),
        deleteGallery: builder.mutation({
            query: (teacherId) => {
                return {
                    url: `/gallery/delete/${teacherId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["gallery"],
        }),
        countGallery: builder.query({
            query: () => {
                return {
                    url: `/gallery/count`,
                    method: "GET",
                };
            },
            providesTags: ["gallery"],
        }),
    }),
});

export const {
    useCreateGalleryMutation,
    useGetAllGalleryAdminQuery,
    useGetAllGalleryUserQuery,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
    useCountGalleryQuery
} = galleryManagementApi;
