import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import styles from "../styles/notePage.css";
import { getStoredNotes } from "~/data/notes";

export default function NotePage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  // await requireUserSession(request);
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === params.noteId);
  if (!selectedNote) {
    throw json(
      {
        message: `Could not find note for id ${params.noteId}`,
      },
      { status: 404 }
    );
  }
  return selectedNote;
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
// export function meta({ data }) {
//   return {
//     title: data.title,
//     description: "Mange your note",
//   };
// }
