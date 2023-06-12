import { Link, useLoaderData } from "@remix-run/react";

export default function Logo() {
  const data = useLoaderData() || {};
  const username = data?.username || null;

  return (
    <h1 id="logo">
      <Link to="/">{username ? `${username}'s Notes` : "My Notes"}</Link>
    </h1>
  );
}
