import { api } from "../api";
let tag: string;
export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getIdentifiers: builder.query({
      query: ({
        pageStart,
        pageLimit,
        content,
        identifier,
      }: {
        pageStart: any;
        pageLimit: any;
        content: string;
        identifier: string;
      }) => {
        console.log(content, identifier)
        if (typeof pageStart !== "boolean") {
          pageStart = String(pageStart);
          pageLimit = String(pageLimit);
        }
        tag = String(
          identifier
            .split("")
            .map((el, i) => (i === 0 ? el[i].toUpperCase() : el))
            .join("")
        );
        return {
          url: `api/identifiers${
            pageStart && pageLimit
              ? `?start=${pageStart}&limit=${pageLimit}&content=${content}&identifier=${identifier}`
              : ""
          }`,
        };
      },
      providesTags: (result, error, arg) => {
        return [
          ...result.data.map(({ id }: any) => ({
            type: `${tag}` as const,
            id,
          })),
          { type: `${tag}`, id: "LIST" },
        ];
      },
    }),
    deleteIdentifier: builder.mutation({
      query: ({
        id,
        content,
        identifier,
      }: {
        id: any;
        content: string;
        identifier: string;
      }) => {
        tag = String(
          identifier
            .split("")
            .map((el, i) => (i === 0 ? el[i].toUpperCase() : el))
            .join("")
        );
        return {
          url: `api/identifiers/${id}${
            content && identifier
              ? `?content=${content}&identifier=${identifier}`
              : ""
          }`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: (result: any, error: any, { id }: any) => {
        if (tag === "Tags" || tag === "Categories") {
          return [{ type: `${tag}` as const, id }];
        } else {
          return [];
        }
      },
    }),
    addIdentifier: builder.mutation({
      query: ({
        name,
        content,
        identifier,
        related,
      }: {
        name: string;
        content: string;
        identifier: string;
        related: any;
      }) => {
        tag = String(
          identifier
            .split("")
            .map((el, i) => (i === 0 ? el[i].toUpperCase() : el))
            .join("")
        );
        return {
          url: `api/identifiers${
            content && identifier
              ? `?content=${content}&identifier=${identifier}`
              : ""
          }`,
          method: "POST",
          body: { name: name, related: related },
        };
      },
      invalidatesTags: (result: any, error: any) => {
        console.log(result, error, tag);
        if (tag === "Tags" || tag === "Categories") {
          return [{ type: `${tag}` as const, id: "LIST" }];
        } else {
          return [];
        }
      },
    }),
  }),
});

export const {
  useGetIdentifiersQuery,
  useDeleteIdentifierMutation,
  useAddIdentifierMutation,
} = extendedApiSlice;
