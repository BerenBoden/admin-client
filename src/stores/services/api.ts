import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { logout } from "../auth/authSlice";

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_TESTBACKEND_API}`,
  prepareHeaders: (headers: Headers, api) => {
    if (api.endpoint !== "getCategories") {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { id } = cookies.get("user");
    const refreshResult = (await baseQuery(
      { url: "api/refresh", method: "post", body: { userId: id } },
      api,
      extraOptions
    )) as any;
    if (refreshResult.data) {
      cookies.set("token", JSON.stringify(refreshResult.data.data), {
        path: "/",
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (result.error?.status === 401) {
        api.dispatch(logout());
        retry.fail(result.error);
      }
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tags", "Categories", "Articles", "Users"],
  endpoints: (builder) => ({}),
});
