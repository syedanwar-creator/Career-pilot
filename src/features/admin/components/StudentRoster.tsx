import { memo } from "react";

import type { SchoolStudentCard } from "@/features/admin/types";
import { Button, Card } from "@/shared/components";

interface StudentRosterProps {
  students: SchoolStudentCard[];
  onSelectStudent: (studentId: string) => Promise<void>;
}

export const StudentRoster = memo(function StudentRoster({
  students,
  onSelectStudent
}: StudentRosterProps): JSX.Element {
  return (
    <div className="grid grid--cards">
      {students.map((item) => (
        <Card key={item.student.id}>
          <div className="card__header">
            <div>
              <p className="eyebrow">{item.student.grade || "Grade not set"}</p>
              <h3>{item.student.fullName}</h3>
            </div>
            <span className="pill">{item.totalPoints} pts</span>
          </div>
          <p>Top recommendation: {item.topRecommendation?.title || "Not available yet"}</p>
          <ul className="list">
            <li>Profile completed: {item.profileCompleted ? "Yes" : "No"}</li>
            <li>Latest proof: {item.latestProof?.careerTitle || "No proof yet"}</li>
          </ul>
          <Button variant="secondary" onClick={() => void onSelectStudent(item.student.id)}>
            View full report
          </Button>
        </Card>
      ))}
    </div>
  );
});
