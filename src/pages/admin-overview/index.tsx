import { useAdminOverviewPage } from "@/features/admin";
import { Card, EmptyState } from "@/shared/components";
import { TablePageSkeleton } from "@/shared/components/Skeletons";

export default function AdminOverviewPage(): JSX.Element {
  const { overview, isLoading } = useAdminOverviewPage();

  if (isLoading) {
    return <TablePageSkeleton />;
  }

  if (!overview) {
    return <EmptyState description="Admin overview data could not be loaded." title="Overview unavailable" />;
  }

  return (
    <div className="stack">
      <div className="feature-grid">
        <Card className="stat-card">
          <strong>{overview.stats.totalStudents}</strong>
          <span>Managed students</span>
        </Card>
        <Card className="stat-card">
          <strong>{overview.stats.completedProfiles}</strong>
          <span>Completed profiles</span>
        </Card>
        <Card className="stat-card">
          <strong>{overview.stats.totalPoints}</strong>
          <span>Total proof points</span>
        </Card>
      </div>
      <Card>
        <div className="card__header">
          <div>
            <p className="eyebrow">Tenant access</p>
            <h2>{overview.tenant.name}</h2>
          </div>
        </div>
        <ul className="list">
          <li>Tenant slug: {overview.tenant.slug}</li>
          <li>Join code: {overview.tenant.joinCode || "Not available"}</li>
          <li>Students with proof records: {overview.stats.proofCount}</li>
        </ul>
      </Card>
    </div>
  );
}
