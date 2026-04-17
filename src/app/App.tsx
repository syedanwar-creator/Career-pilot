import { RouterProvider } from "react-router-dom";

import { AuthPageSkeleton } from "@/shared/components";
import { appRouter } from "@/routes";

export function App(): JSX.Element {
  return <RouterProvider fallbackElement={<AuthPageSkeleton />} router={appRouter} />;
}
