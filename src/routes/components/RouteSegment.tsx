import { Suspense, type ReactNode } from "react";

import { RouteErrorBoundary } from "./RouteErrorBoundary";

interface RouteSegmentProps {
  children?: ReactNode;
  fallback: ReactNode;
  segmentLabel: string;
}

export function RouteSegment({ children, fallback, segmentLabel }: RouteSegmentProps): JSX.Element {
  return (
    <RouteErrorBoundary segmentLabel={segmentLabel}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </RouteErrorBoundary>
  );
}
