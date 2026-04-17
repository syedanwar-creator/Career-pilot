import { Link, useParams } from "react-router-dom";

import { CareerDetail, useCareerDetailPage } from "@/features/dashboard";
import { routePaths } from "@/routes/paths";
import { EmptyState } from "@/shared/components";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";

export default function DashboardCareerDetailPage(): JSX.Element {
  const { careerId } = useParams<{ careerId: string }>();
  const { career, isLoading } = useCareerDetailPage(careerId);

  if (isLoading) {
    return <ContentPageSkeleton />;
  }

  if (!career) {
    return (
      <EmptyState
        title="Career not found"
        description="This career could not be loaded. Go back to the full list and choose another career."
        action={
          <Link className="button button--secondary" to={routePaths.dashboardCareers}>
            Back to career list
          </Link>
        }
      />
    );
  }

  return <CareerDetail career={career} />;
}
