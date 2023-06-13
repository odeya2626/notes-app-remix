import { Form, Link, useSearchParams } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";
import styles from "./Search.css";
import { useEffect, useState } from "react";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const handleClear = () => {
    setSearch("");
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    setParams({ ...params, query: e.target.value });
  };

  return (
    <div>
      <Form className="search-form">
        <div>
          <input
            type="text"
            name="query"
            placeholder="Search notes..."
            value={search}
            onChange={handleChange}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <Link to="/notes" onClick={handleClear}>
          Clear
        </Link>
      </Form>
    </div>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
