import { Suspense } from "react";
import LoginForm from "./_login-form";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
