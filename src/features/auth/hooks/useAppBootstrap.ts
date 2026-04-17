import { useEffect } from "react";

import { authApi } from "@/features/auth/api";
import { useAppStore, useAuthStore, useUiStore } from "@/store";

export function useAppBootstrap(): void {
  const status = useAuthStore((state) => state.status);
  const setBootstrapping = useAuthStore((state) => state.setBootstrapping);
  const setSession = useAuthStore((state) => state.setSession);
  const setAnonymous = useAuthStore((state) => state.setAnonymous);
  const setConfig = useAppStore((state) => state.setConfig);
  const showNotice = useUiStore((state) => state.showNotice);

  useEffect(() => {
    if (status === "authenticated" || status === "anonymous") {
      return;
    }

    let isActive = true;

    if (status === "idle") {
      setBootstrapping();
    }

    Promise.all([authApi.getAppConfig(), authApi.getSession()])
      .then(([config, session]) => {
        if (!isActive) {
          return;
        }

        setConfig(config);
        setSession(session);
      })
      .catch((error: Error) => {
        if (!isActive) {
          return;
        }

        setAnonymous();
        showNotice(error.message || "Unable to bootstrap the application.", "danger");
      });

    return () => {
      isActive = false;
    };
  }, [setAnonymous, setBootstrapping, setConfig, setSession, showNotice, status]);
}
