import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AutthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  //add validation
  try {
    validateCredentials(userData);
  } catch (error) {
    console.log(error);
    return error;
  }
  try {
    if (authMode === "login") {
      //login
      return await login(userData);
    } else {
      //signup
      return await signup(userData);
    }
  } catch (error) {
    if (error.status === 401) {
      return { credentials: error.message };
    }
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
