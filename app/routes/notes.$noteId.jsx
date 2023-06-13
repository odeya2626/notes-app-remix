import { useNavigate, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import styles from "../styles/notePage.css";
import {
  deleteNoteById,
  getNoteById,
  updateNoteById,
} from "~/data/notes.server";
import Modal from "~/components/utils/Modal";
import NewNote from "~/components/NewNote";

export default function NotePage() {
  const [params] = useSearchParams();

  const navigate = useNavigate();
  function closeHandler() {
    navigate(`..?${params.toString()}`);
  }

  return (
    <Modal onClose={closeHandler}>
      <NewNote />
    </Modal>
  );
}

export async function loader({ params }) {
  try {
    const noteId = params.noteId;
    const note = await getNoteById(noteId);
    return note;
  } catch (error) {
    return json({ message: "Note not found", status: 404 });
  }
}

export async function action({ params, request }) {
  try {
    const noteId = params.noteId;
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    if (request.method === "DELETE") {
      await deleteNoteById(noteId);
    } else if (request.method === "PATCH") {
      await updateNoteById(noteId, noteData);
    }
    return redirect(`/notes`);
  } catch (error) {
    return json({ message: error.message, status: 404 });
  }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
