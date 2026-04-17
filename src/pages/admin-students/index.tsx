import { useState } from "react";

import { AdminStudentReport, StudentRoster, useAdminStudentsPage } from "@/features/admin";
import { Button, Card, EmptyState, Field } from "@/shared/components";
import { TablePageSkeleton } from "@/shared/components/Skeletons";

export default function AdminStudentsPage(): JSX.Element {
  const { createStudent, isLoading, isSubmitting, overview, selectStudent, selectedStudent } = useAdminStudentsPage();
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    grade: "",
    password: ""
  });

  if (isLoading) {
    return <TablePageSkeleton />;
  }

  if (!overview) {
    return <EmptyState description="Student management data could not be loaded." title="Student workspace unavailable" />;
  }

  return (
    <div className="split-layout">
      <div className="stack">
        <Card className="stack">
          <div className="card__header">
            <div>
              <p className="eyebrow">Create student</p>
              <h2>Onboard a learner into this tenant</h2>
            </div>
          </div>
          <div className="form-row">
            <Field htmlFor="student-name" label="Student full name">
              <input
                id="student-name"
                className="input"
                value={formValues.fullName}
                onChange={(event) => setFormValues((current) => ({ ...current, fullName: event.target.value }))}
              />
            </Field>
            <Field htmlFor="student-email" label="Student email">
              <input
                id="student-email"
                className="input"
                value={formValues.email}
                onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
              />
            </Field>
          </div>
          <div className="form-row">
            <Field htmlFor="student-grade" label="Grade / stage">
              <input
                id="student-grade"
                className="input"
                value={formValues.grade}
                onChange={(event) => setFormValues((current) => ({ ...current, grade: event.target.value }))}
              />
            </Field>
            <Field htmlFor="student-password" label="Temporary password">
              <input
                id="student-password"
                className="input"
                value={formValues.password}
                onChange={(event) => setFormValues((current) => ({ ...current, password: event.target.value }))}
              />
            </Field>
          </div>
          <div className="actions">
            <Button
              disabled={isSubmitting}
              onClick={async () => {
                await createStudent(formValues);
                setFormValues({
                  fullName: "",
                  email: "",
                  grade: "",
                  password: ""
                });
              }}
            >
              {isSubmitting ? "Creating..." : "Create student account"}
            </Button>
          </div>
        </Card>

        <Card className="stack">
          <div className="card__header">
            <div>
              <p className="eyebrow">Managed students</p>
              <h2>School roster</h2>
            </div>
          </div>
          <StudentRoster students={overview.students} onSelectStudent={selectStudent} />
        </Card>
      </div>
      <AdminStudentReport report={selectedStudent} />
    </div>
  );
}
