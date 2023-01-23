import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useState, useEffect, useRef } from "react";
import Button from "../base-components/Button";
import Lucide from "../base-components/Lucide";
import Notification from "../base-components/Notification";
import { NotificationElement } from "../base-components/Notification";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useNotification(
  isSuccess: boolean,
  isError: boolean,
  identifier: string,
  name: string
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
        text: `Successfully added ${identifier}: "${name}"`,
        className: "text-green-500",
      });
      notification.current?.showToast();
    }
    if (isError) {
      setNotificationProps({
        icon: "XCircle",
        text: "There was an error, please try again.",
        className: "text-red-500",
      });
      notification.current?.showToast();
    }
  }, [isSuccess, isError]);

  return { notificationProps, validIcon, notification };
}
