import { useEffect, type PropsWithChildren } from "react";

import { setUnauthorizedHandler } from "@/services";
import { useAuthStore } from "@/store";

export function AppProviders({ children }: PropsWithChildren): JSX.Element {
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    return setUnauthorizedHandler(() => {
      clearSession();
    });
  }, [clearSession]);

  return <>{children}</>;
}
