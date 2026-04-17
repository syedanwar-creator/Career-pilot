import { Outlet, ScrollRestoration } from "react-router-dom";

import { NoticeBanner } from "@/shared/components";
import { usePageFocus } from "@/shared/hooks";
import { useAuthStore } from "@/store";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";
import { useAppBootstrap } from "@/features/auth";

export function AppLayout(): JSX.Element {
  const status = useAuthStore((state) => state.status);

  useAppBootstrap();
  usePageFocus();

  if (status === "idle" || status === "bootstrapping") {
    return <ContentPageSkeleton />;
  }

  return (
    <>
      <a className="skip-link" href="#route-content">
        Skip to content
      </a>
      <div className="app-frame">
        <NoticeBanner />
        <main id="route-content" className="route-content" data-route-focus tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
}
