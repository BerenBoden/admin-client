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
        tag = String(identifier.split("").map((el, i) => i === 0 ? el[i].toUpperCase() : el).join(''))
        return {
          url: `api/identifiers${
            pageStart && pageLimit
              ? `?start=${pageStart}&limit=${pageLimit}&content=${content}&identifier=${identifier}`
              : ""
          }`,
        };
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result.data.map(({ id }: any) => ({
                type: `${tag}` as const,
                id,
              })),
              `${tag}`,
            ]
          : [`${tag}`];
      },
    }),
    deleteIdentifier: builder.mutation({
      query: ({ id, identifier }: { id: any; identifier: string }) => {
        tag = String(identifier.split("").map((el, i) => i === 0 ? el[i].toUpperCase() : el).join(''));
        return {
          url: `api/identifiers/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      
      invalidatesTags: (result: any, error: any, { id }: any) => {
  
        if (tag === "Identifiers") {
          return [{ type: `${tag}` as const, id }];
        }
        else {
          return []
        }
      },
    }),
  }),
});

export const { useGetIdentifiersQuery, useDeleteIdentifierMutation } =
  extendedApiSlice;
