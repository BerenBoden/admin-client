import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import { CookiesProvider } from "react-cookie";
export const SERVER_API = import.meta.env.VITE_NODE_ENV = 'production' ? import.meta.env.VITE_SERVER_API : 'http://localhost:5000';
export const STRAPI_API = import.meta.env.VITE_NODE_ENV = 'production' ? import.meta.env.VITE_STRAPI_API : 'http://localhost:1337';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <CookiesProvider>
      <Provider store={store}>
        <Router />
      </Provider>
      <ScrollToTop />
    </CookiesProvider>
  </BrowserRouter>
);
