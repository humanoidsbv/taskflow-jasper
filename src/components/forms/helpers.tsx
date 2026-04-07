import { toast } from "sonner";
import CloseIcon from "@/public/icons/close.svg";

export const showCreatedToast = (
  className: "toastSuccess" | "toastFailure",
  text?: string,
) => {
  const toastId = toast(text ? text : "New member added", {
    duration: 5000,
    className,
    cancel: (
      <CloseIcon alt="Close message" onClick={() => toast.dismiss(toastId)} />
    ),
  });
};
