"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { generateSchoolReport } from "@/lib/api";

export function GenerateSchoolReportButton({ tenantId }: { tenantId: string }): JSX.Element {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(): Promise<void> {
    setPending(true);
    setError(null);

    try {
      await generateSchoolReport(tenantId);
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate school report.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      <button
        type="button"
        onClick={handleGenerate}
        disabled={pending}
        style={{
          border: 0,
          borderRadius: "999px",
          padding: "12px 18px",
          background: "#12344d",
          color: "#fff",
          cursor: pending ? "wait" : "pointer"
        }}
      >
        {pending ? "Generating report..." : "Generate school report"}
      </button>
      {error ? <p style={{ margin: 0, color: "#b42318" }}>{error}</p> : null}
    </div>
  );
}
