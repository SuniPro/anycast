import { RefObject, useMemo } from "react";

export function useSafeRef<T extends HTMLElement>(ref: RefObject<T | null>) {
  return useMemo(() => ({ current: ref.current }) as RefObject<T>, [ref]);
}
