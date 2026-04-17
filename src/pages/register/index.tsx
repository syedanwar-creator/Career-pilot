import { Link } from "react-router-dom";

import { RegisterForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function RegisterPage(): JSX.Element {
  const { isSubmitting, register } = useAuthActions();

  return (
    <div className="stack">
      <header className="page-header">
        <p className="eyebrow">Register</p>
        <h1>Create the right account type</h1>
        <p>Solo students, school admins, and school-linked students each get their own structured route flow.</p>
      </header>
      <RegisterForm isSubmitting={isSubmitting} onSubmit={register} />
      <Link className="text-link" to={routePaths.login}>
        Already have an account?
      </Link>
    </div>
  );
}
