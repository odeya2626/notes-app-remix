// import { links as newNoteLinks } from "../components/NewNote";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus } from "react-icons/fa";

import NoteList, { links as noteListLinks } from "../components/NoteList";
import { links as SearchLinks } from "../components/utils/Search";
import { links as newNoteLinks } from "../components/NewNote";
import { requireUserSession } from "~/data/auth.server";
import { getNotes } from "~/data/notes.server";
import SearchBar from "~/components/utils/Search";

export default function NotesPage() {
  const { notes } = useLoaderData();
  const hasNotes = notes && notes.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <SearchBar />
        <section>
          <Link to="/notes/add" className="cta-alt">
            <FaPlus />
            <span>Add Note</span>
          </Link>
        </section>

        {hasNotes && <NoteList notes={notes} />}
        {!hasNotes && <p className="info-message">No notes yet</p>}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = search.get("query") || "";
  const notes = await getNotes(userId, query);

  return { notes };
}

export function links() {
  return [...SearchLinks(), ...newNoteLinks(), ...noteListLinks()];
}
