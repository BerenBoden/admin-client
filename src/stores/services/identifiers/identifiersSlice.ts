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
    getIdentifierById: builder.query({
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
          url: `api/identifiers/${id}?content=${content}&identifier=${identifier}`,
        };
      },
      providesTags: (result, error, arg) => {
        if (tag === "Tags" || tag === "Categories") {
          return [{ type: `${tag}` as const, id: result.data.id }];
        } else {
          return [];
        }
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
    updateIdentifier: builder.mutation({
      query: ({
        id,
        name,
        content,
        identifier,
        slug,
        related,
        meta_description,
      }: any) => {
        tag = String(
          identifier
            .split("")
            .map((el: any, i: any) => (i === 0 ? el[i].toUpperCase() : el))
            .join("")
        );
        return {
          url: `api/identifiers/${id}?content=${content}&identifier=${identifier}`,
          method: "PUT",
          body: {
            name: name,
            related: related,
            slug,
            meta_description: meta_description,
          },
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
        meta_description,
        slug,
        related,
      }: {
        name: string;
        content: string;
        identifier: string;
        meta_description: string;
        slug: string;
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
          body: {
            name: name,
            slug: slug,
            related: related,
            meta_description: meta_description,
          },
        };
      },
      invalidatesTags: (result: any, error: any) => {
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
  useGetIdentifierByIdQuery,
  useDeleteIdentifierMutation,
  useAddIdentifierMutation,
  useUpdateIdentifierMutation,
} = extendedApiSlice;
