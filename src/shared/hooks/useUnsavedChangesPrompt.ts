import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function useUnsavedChangesPrompt(isDirty: boolean, message: string): void {
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state !== "blocked") {
      return;
    }

    const shouldLeave = window.confirm(message);

    if (shouldLeave) {
      blocker.proceed();
      return;
    }

    blocker.reset();
  }, [blocker, message]);

  useEffect(() => {
    if (!isDirty) {
      return undefined;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      event.returnValue = message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);
}
