import { api } from "../api";

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "api/users",
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => {
        return [
          { type: "Users", id: "LIST" },
          ...result.map((id: number) => ({ type: "Users", id })),
        ];
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;
