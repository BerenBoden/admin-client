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
    addArticle: builder.mutation({
      query: (data) => {
        return {
          url: `api/articles`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result: any, error: any) => {
        console.log(result, error)
        return [{ type: "Articles", id: "LIST" }]
      }
    }),
  }),
});

export const { useGetArticlesQuery, useAddArticleMutation } = extendedApiSlice;
