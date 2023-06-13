import { links as newNoteLinks } from "../components/NewNote";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus } from "react-icons/fa";

import NoteList, { links as noteListLinks } from "../components/NoteList";
import { requireUserSession } from "~/data/auth.server";
import { getNotes } from "~/data/notes.server";

export default function NotesPage() {
  const { notes } = useLoaderData();
  const hasNotes = notes && notes.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section>
          <Link to="/notes/add" style={{ color: "white" }}>
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
  const notes = await getNotes(userId);

  return { notes };
}

// export async function action({ request }) {
//   const formData = await request.formData();
//   const noteData = Object.fromEntries(formData);
//   //add validation

//   if (noteData.title.length < 3) {
//     return { message: "Title must be at least 3 characters long", status: 400 };
//   }

//   await storeNotes(updatedNotes);
//   return redirect("/notes");
// }

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
