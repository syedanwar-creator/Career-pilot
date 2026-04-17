import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

import { routePaths } from "@/routes/paths";
import { Button, Card } from "@/shared/components";

interface RouteErrorBoundaryProps {
  children?: ReactNode;
  segmentLabel: string;
}

function RouteErrorFallback({ error, resetErrorBoundary, segmentLabel }: FallbackProps & { segmentLabel: string }): JSX.Element {
  return (
    <Card className="error-panel" role="alert">
      <p className="eyebrow">Route error</p>
      <h2>{segmentLabel} failed to render.</h2>
      <p>{error.message}</p>
      <div className="actions">
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Link className="text-link" to={routePaths.home}>
          Back to safety
        </Link>
      </div>
    </Card>
  );
}

export function RouteErrorBoundary({ children, segmentLabel }: RouteErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary fallbackRender={(props) => <RouteErrorFallback {...props} segmentLabel={segmentLabel} />}>
      {children}
    </ErrorBoundary>
  );
}
