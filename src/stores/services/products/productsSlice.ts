import { api } from "../api";

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageStart, pageLimit }: { pageStart: any; pageLimit: any }) => {
        if (typeof pageStart !== "boolean") {
          pageStart = String(pageStart);
          pageLimit = String(pageLimit);
        }
        return {
          url: `api/products${
            pageStart && pageLimit
              ? `?start=${pageStart}&limit=${pageLimit}`
              : ""
          }`,
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = extendedApiSlice;
