import type { PropsWithChildren, ReactNode } from "react";

interface EmptyStateProps extends PropsWithChildren {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ action, description, title }: EmptyStateProps): JSX.Element {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? <div className="actions">{action}</div> : null}
    </div>
  );
}
