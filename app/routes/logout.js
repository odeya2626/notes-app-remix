import { destroyUserSession } from "~/data/auth.server";

export function action({ request }) {
  if (request.method !== "DELETE") {
    throw json({ message: "Invalid request method" }, { status: 405 });
  }
  return destroyUserSession(request);
}
