import { Link } from "react-router-dom";

import { routePaths } from "@/routes/paths";
import { Button, Card } from "@/shared/components";

export default function NotFoundPage(): JSX.Element {
  return (
    <Card className="error-panel">
      <p className="eyebrow">404</p>
      <h1>That route is outside the safe path.</h1>
      <p>The page you asked for does not exist, or the route was removed during the platform refactor.</p>
      <div className="actions">
        <Link className="button button--primary" to={routePaths.home}>
          Back to safety
        </Link>
        <Button variant="secondary" onClick={() => window.history.back()}>
          Go back
        </Button>
      </div>
    </Card>
  );
}
