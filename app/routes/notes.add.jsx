import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import Modal from "~/components/utils/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addNote } from "~/data/notes.server";
import { isValidTitle } from "~/data/validation.server";

export default function AddNote() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }
  return (
    <Modal onClose={closeHandler}>
      <NewNote />
    </Modal>
  );
}

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.userId = userId;

  isValidTitle(noteData.title);
  await addNote(noteData);
  return redirect("/notes");
}
