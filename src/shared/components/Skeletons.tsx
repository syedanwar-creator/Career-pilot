export function AuthPageSkeleton(): JSX.Element {
  return (
    <div className="skeleton-page skeleton-page--auth" aria-hidden="true">
      <div className="skeleton-card skeleton-card--hero" />
      <div className="skeleton-card skeleton-card--form" />
    </div>
  );
}

export function ContentPageSkeleton(): JSX.Element {
  return (
    <div className="skeleton-page" aria-hidden="true">
      <div className="skeleton-toolbar" />
      <div className="skeleton-grid">
        <div className="skeleton-card skeleton-card--large" />
        <div className="skeleton-card skeleton-card--large" />
      </div>
      <div className="skeleton-grid">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    </div>
  );
}

export function TablePageSkeleton(): JSX.Element {
  return (
    <div className="skeleton-page" aria-hidden="true">
      <div className="skeleton-toolbar" />
      <div className="skeleton-card skeleton-card--table" />
    </div>
  );
}
