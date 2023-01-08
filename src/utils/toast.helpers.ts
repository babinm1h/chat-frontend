import { toast, ToastContent } from 'react-toastify';

export const notifyError = (errorMsg: string | string[]) => {
  if (Array.isArray(errorMsg)) {
    return toast.error(errorMsg.toString());
  }
  return toast.error(errorMsg);
};

export const notifyMessage = (msg: ToastContent) => {
  return toast(msg, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};

export const notifyFriendRequest = (name: string) => {
  return toast(`New friend request by ${name}`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'dark',
  });
};

export const notifyWarn = (msg: ToastContent) => {
  return toast.warn(msg, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'dark',
  });
};
