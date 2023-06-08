import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export default function NotesPage() {
  const { notes } = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
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
