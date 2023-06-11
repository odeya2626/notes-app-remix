import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <h1 id="logo">
      <Link to="/">My Notes</Link>
    </h1>
  );
}
