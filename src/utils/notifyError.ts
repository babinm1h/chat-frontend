import { toast } from "react-toastify";

export const notifyError = (errorMsg: string | string[]) => {
  if (Array.isArray(errorMsg)) {
    return toast.error(errorMsg.toString());
  }
  return toast.error(errorMsg);
};
