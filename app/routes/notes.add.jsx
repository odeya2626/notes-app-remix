import { redirect } from "@remix-run/node";
import { useNavigate, useSearchParams } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import Modal from "~/components/utils/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addNote } from "~/data/notes.server";

export default function AddNote() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  function closeHandler() {
    navigate(`..?${params.toString()}`);
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

  await addNote(noteData);
  return redirect("/notes");
}
