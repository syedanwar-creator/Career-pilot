import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageFocus(): void {
  const location = useLocation();

  useEffect(() => {
    const target = document.querySelector<HTMLElement>("[data-route-focus]");
    target?.focus();
  }, [location.pathname]);
}
