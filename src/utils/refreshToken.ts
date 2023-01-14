import axios from "axios";
import { Cookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const cookies = new Cookies();

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    console.log("initial");
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("refresh");
      const refreshToken = cookies.get("refreshToken");
      let apiResponse = await axios.post(
        "http://localhost:1337/api/token/refresh",
        JSON.stringify({ refreshToken: refreshToken }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      cookies.set("token", JSON.stringify(apiResponse.data.jwt));
      cookies.set(
        "refreshToken",
        JSON.stringify(apiResponse.data.refreshToken)
      );
      const decoded: any = jwtDecode(apiResponse.data.jwt);
      if (decoded.exp - Date.now() / 1000 < 300) {
        // Refresh token
        console.log("refreshEXP");
        const newTokens = await axios.post(
          "http://localhost:1337/api/token/refresh",
          JSON.stringify({ refreshToken: refreshToken }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        cookies.set("token", newTokens.data.jwt);
        cookies.set("refreshToken", newTokens.data.refreshToken);
        error.config.headers[
          "Authorization"
        ] = `Bearer ${newTokens.data.jwt}`;
        return jwtInterceoptor(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
export default jwtInterceoptor;
