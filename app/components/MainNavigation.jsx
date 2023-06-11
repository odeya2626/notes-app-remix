import { NavLink, Link, useLoaderData, Form } from "@remix-run/react";
import Logo from "./utils/Logo";

export default function MainNavigation() {
  const userId = useLoaderData();
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>{userId && <NavLink to="/notes">Notes</NavLink>}</li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="delete" action="/logout" id="logout-form">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
