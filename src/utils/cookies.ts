import Cookies from "js-cookie";

const COOKIE_KEY = "HUMAN_CHECK";
const secrets = import.meta.env.VITE_HUMAN_SECRETS;

// 쿠키 생성
export const setIntroCookie = () => {
  const value = `${Date.now()}-${Math.random()}-${secrets}`;
  Cookies.set(COOKIE_KEY, btoa(value)); // base64로 저장 (or 그냥 그대로도 OK)
};

// 쿠키 확인
export const hasIntroCookie = () => Cookies.get(COOKIE_KEY) !== undefined;

export const setSessionCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

export const getCookie = (name: string) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};
