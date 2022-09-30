import Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  Cookies.set("chatToken", token, { expires: 30 });
};

export const removeTokenCookie = () => {
  Cookies.remove("chatToken");
};

export const getTokenCookie = () => {
  return Cookies.get("chatToken");
};
