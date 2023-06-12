import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useRouteError } from "@remix-run/react";

import { getUserFromSession, getUsername } from "./data/auth.server";
import Error from "./components/utils/Error";
import styles from "./styles/main.css";
import MainNavigation from "./components/MainNavigation";

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
export async function loader({ request }) {
  const userId = await getUserFromSession(request);
  if (!userId) return { userId: null, username: null };
  const username = await getUsername(userId);
  return { userId, username };
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Document title="Error">
      <Error title={"An error occurred!"}>
        <main>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
      </Error>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
