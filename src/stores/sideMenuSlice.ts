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
          pathname: "/categories",
          title: "Categories",
        },
        {
          icon: "Activity",
          pathname: "/add-product",
          title: "Add Product",
        },
        {
          icon: "Activity",
          pathname: "/product-list",
          title: "View Products",
        },
        {
          icon: "Activity",
          pathname: "/transaction-list",
          title: "Transactions",
        },
        {
          icon: "Activity",
          pathname: "/seller-list",
          title: "Sellers",
        },
        {
          icon: "Activity",
          pathname: "/reviews",
          title: "Reviews",
        },
      ],
    },
    {
      icon: "FileText",
      title: "Articles",
      subMenu: [
        {
          icon: "Activity",
          title: "View Articles",
          pathname: "/blog-layout-1",
        },
        {
          icon: "Activity",
          title: "Add Article",
          pathname: "/post",
        },
      ]
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
      pathname: "/users-layout-1",
    },
    {
      icon: "Trello",
      title: "Profile",
      pathname: "/profile-overview-1",
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
