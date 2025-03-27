import { useLocation } from "react-router-dom";

export function useLastPath() {
  const location = useLocation();
  return location.pathname.split("/").filter(Boolean).pop() || "";
}
