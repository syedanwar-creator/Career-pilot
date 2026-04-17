import { memo } from "react";

import { Button, Card } from "@/shared/components";
import type { DemoAccount } from "@/shared/types";

interface DemoCredentialsProps {
  accounts: DemoAccount[];
  onUseDemo?: (account: DemoAccount) => void;
}

export const DemoCredentials = memo(function DemoCredentials({
  accounts,
  onUseDemo
}: DemoCredentialsProps): JSX.Element | null {
  if (!accounts.length) {
    return null;
  }

  return (
    <div className="stack">
      {accounts.map((account) => (
        <Card key={account.email} className="credential-card">
          <div className="card__header">
            <div>
              <p className="eyebrow">{account.roleLabel}</p>
              <h3>{account.label}</h3>
            </div>
            {onUseDemo ? (
              <Button variant="secondary" onClick={() => onUseDemo(account)}>
                Use demo
              </Button>
            ) : null}
          </div>
          <p>{account.description}</p>
          <dl className="credential-list">
            <div>
              <dt>Email</dt>
              <dd>{account.email}</dd>
            </div>
            <div>
              <dt>Password</dt>
              <dd>{account.password}</dd>
            </div>
            {account.tenantSlug ? (
              <div>
                <dt>Tenant slug</dt>
                <dd>{account.tenantSlug}</dd>
              </div>
            ) : null}
          </dl>
        </Card>
      ))}
    </div>
  );
});
