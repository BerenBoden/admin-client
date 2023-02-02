import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      title: "Dashboard",
      pathname: "/",
    },
    {
      icon: "ShoppingBag",
      title: "E-Commerce",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/products",
          title: "Products",
        },
        {
          icon: "Activity",
          pathname: "/product-categories",
          title: "Categories",
        },
        {
          icon: "Activity",
          pathname: "/product-tags",
          title: "Tags",
        },
        {
          icon: "Activity",
          pathname: "/transactions",
          title: "Transactions",
        },
        {
          icon: "Activity",
          pathname: "/coupons",
          title: "Coupons",
        },
        {
          icon: "Activity",
          pathname: "/sellers",
          title: "Sellers",
        },
        {
          icon: "Activity",
          pathname: "/analytics",
          title: "Analytics",
        },
      ],
    },
    {
      icon: "FileText",
      title: "Articles",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/articles",
          title: "Articles",
        },
        {
          icon: "Activity",
          pathname: "/article-categories",
          title: "Categories",
        },
        {
          icon: "Activity",
          pathname: "/article-tags",
          title: "Tags",
        },
        {
          icon: "Activity",
          pathname: "/publishers",
          title: "Publishers",
        },
        {
          icon: "Activity",
          pathname: "/analytics",
          title: "Analytics",
        },
      ],
    },
    {
      icon: "Inbox",
      pathname: "/inbox",
      title: "Inbox",
    },
    {
      icon: "MessageSquare",
      pathname: "/chat",
      title: "Chat",
    },
    "divider",
    {
      icon: "Users",
      title: "Users",
      pathname: "/users",
    },
    {
      icon: "Trello",
      title: "Profile",
      pathname: "/profile",
    },
    // {
    //   icon: "Layout",
    //   title: "Pages",
    //   subMenu: [
    //     // {
    //     //   icon: "Activity",
    //     //   title: "Add Editors",
    //     //   pathname: "/wizard-layout-2",
    //     // },
    //     {
    //       icon: "Activity",
    //       title: "Pricing",
    //       subMenu: [
    //         {
    //           icon: "Zap",
    //           pathname: "/pricing-layout-1",
    //           title: "Layout 1",
    //         },
    //         {
    //           icon: "Zap",
    //           pathname: "/pricing-layout-2",
    //           title: "Layout 2",
    //         },
    //       ],
    //     },
    //     {
    //       icon: "Activity",
    //       title: "Invoice",
    //       subMenu: [
    //         {
    //           icon: "Zap",
    //           pathname: "/invoice-layout-1",
    //           title: "Layout 1",
    //         },
    //         {
    //           icon: "Zap",
    //           pathname: "/invoice-layout-2",
    //           title: "Layout 2",
    //         },
    //       ],
    //     },
    //     {
    //       icon: "Activity",
    //       title: "FAQ",
    //       subMenu: [
    //         {
    //           icon: "Zap",
    //           pathname: "/faq-layout-1",
    //           title: "Layout 1",
    //         },
    //         {
    //           icon: "Zap",
    //           pathname: "/faq-layout-2",
    //           title: "Layout 2",
    //         },
    //         {
    //           icon: "Zap",
    //           pathname: "/faq-layout-3",
    //           title: "Layout 3",
    //         },
    //       ],
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "login",
    //       title: "Login",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "register",
    //       title: "Register",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "error-page",
    //       title: "Error Page",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/update-profile",
    //       title: "Update profile",
    //     },
    //     {
    //       icon: "Activity",
    //       pathname: "/change-password",
    //       title: "Change Password",
    //     },
    //   ],
    // },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
