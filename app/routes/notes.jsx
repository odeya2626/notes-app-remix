import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function NotesPage() {
  const { notes } = useLoaderData();
  const hasNotes = notes && notes.length > 0;
  return (
    <main>
      <NewNote />
      {hasNotes && <NoteList notes={notes} />}
      {!hasNotes && <p className="info-message">No notes yet</p>}
    </main>
  );
}

export async function loader({ request }) {
  await requireUserSession(request);
  const notes = await getStoredNotes();

  return { notes };
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //add validation

  if (noteData.title.length < 3) {
    return { message: "Title must be at least 3 characters long", status: 400 };
  }
  const storedNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...storedNotes, noteData];
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

// export function meta() {
//   return {
//     title: "Notes",
//     description: "A list of notes",
//   };
// }

export function CatchBoundary() {
  const caughtResponse = useRouteError();
  console.log(caughtResponse);
  return (
    <main>
      <NewNote />
      <h1>An error occurred!</h1>
      <p className="info-message">{error.message}</p>
    </main>
  );
}
