import LoginForm from "@/components/auth/login/LoginForm";
import SignUpForm from "@/components/auth/SignUp/SignUpForm";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const authParam = useSearchParams();
  const authAction = authParam.get("action");


  return authAction === "signup" ? <SignUpForm /> : <LoginForm />;
}
