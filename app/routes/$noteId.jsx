import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import styles from "../styles/notePage.css";
import { getStoredNotes } from "~/data/notes";
import { getNoteById } from "~/data/notes.server";

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
  try {
    const noteId = Number(params.noteId);
    const note = await getNoteById(noteId);

    return note;
  } catch (error) {
    return json({ message: "Note not found", status: 404 });
  }
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
