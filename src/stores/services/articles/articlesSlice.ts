import { api } from "../api";

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ pageStart, pageLimit }: { pageStart: any; pageLimit: any }) => {
        if (typeof pageStart !== "boolean") {
          pageStart = String(pageStart);
          pageLimit = String(pageLimit);
        }
        return {
          url: `api/articles${
            pageStart && pageLimit
              ? `?start=${pageStart}&limit=${pageLimit}`
              : ""
          }`,
        };
      },
      providesTags: (result, error, arg) => {
        return [
          { type: "Articles", id: "LIST" },
          ...result.data.map((id: any) => ({ type: "Articles", id })),
        ];
      },
    }),
    getArticleById: builder.query({
      query: ({ id }: any) => {
        return {
          url: `api/articles/${id}`,
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Articles", id: result.data.id }];
      },
    }),
    updateArticle: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `api/articles/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result: any, error: any) => {
        return [
          { type: "Articles", id: result.data.id },
          { type: "Articles", id: "LIST" },
        ];
      },
    }),
    addArticle: builder.mutation({
      query: (data) => {
        return {
          url: `api/articles`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result: any, error: any) => {
        return [{ type: "Articles", id: "LIST" }];
      },
    }),
    deleteArticle: builder.mutation({
      query: ({ id }: any) => {
        console.log(id);
        return {
          url: `api/articles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result: any, error: any) => {
        return [{ type: "Articles", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = extendedApiSlice;
