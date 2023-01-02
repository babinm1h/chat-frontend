import { toast, ToastContent } from 'react-toastify';

export const notifyError = (errorMsg: string | string[]) => {
  if (Array.isArray(errorMsg)) {
    return toast.error(errorMsg.toString());
  }
  return toast.error(errorMsg);
};

export const notifyMessage = (msg: ToastContent) => {
  return toast(msg, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};
