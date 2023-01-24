import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState, useEffect, useRef } from "react";
import { NotificationElement } from "../base-components/Notification";
import { useParams, useLocation } from "react-router-dom";
import { pagination } from "../utils/helper";
import {useGetIdentifiersQuery} from './services/identifiers/identifiersSlice'

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useNotification(
  isSuccess: boolean,
  isError: boolean,
  text: string
) {
  const [notificationProps, setNotificationProps] = useState({
    icon: "CheckCircle",
    text: "",
    className: "",
  });
  const notification = useRef<NotificationElement>();
  const isValidIcon = (icon: string): icon is "CheckCircle" | "XCircle" => {
    return ["CheckCircle", "XCircle"].includes(icon);
  };
  const validIcon = isValidIcon(notificationProps.icon)
    ? notificationProps.icon
    : "CheckCircle";
  useEffect(() => {
    if (isSuccess) {
      setNotificationProps({
        icon: "CheckCircle",
        text,
        className: "text-green-500",
      });
      notification.current?.showToast();
    }
    if (isError) {
      setNotificationProps({
        icon: "XCircle",
        text,
        className: "text-red-500",
      });
      notification.current?.showToast();
    }
  }, [isSuccess, isError]);

  return { notificationProps, validIcon, notification };
}

export function useGetIdentifierNameAndId(){
  const {search} = useLocation();
  const {name} = useParams();
  return {
    identifierName: name,
    identifierId: search.split('=')[1]
  }
}

export function usePagination(pageLimit: number, queryFunction: any, ...rest: any) {
    const [page, setPage] = useState(1);
    const [pageStart, setPageStart] = useState(0);
   
    const { data, error, isLoading: paginationIsLoading } = queryFunction({
      pageStart, 
      pageLimit, 
      content: rest[0].content || undefined,
      identifier: rest[0].identifier || undefined
  });
    
    
  
    const pages = pagination(data?.meta.pagination.total, pageLimit);
    const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
    const currentPages = pagesArray.slice(page - 1, page + 2);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pages) return;
        if (newPage > page) {
          setPageStart((newPage - 1) * 10);
          setPage(newPage);
        } else {
          setPageStart(pageStart - (page - newPage) * 10);
          setPage(newPage);
        }
    };

    return { page, currentPages, handlePageChange, paginationIsLoading, data}
}