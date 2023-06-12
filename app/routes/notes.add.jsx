import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import Modal from "~/components/utils/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addNote } from "~/data/notes.server";

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
  console.log("action add");
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.userId = userId;
  //add validation

  if (noteData.title.length < 3) {
    return { message: "Title must be at least 3 characters long", status: 400 };
  }
  console.log(noteData);
  await addNote(noteData);
  return redirect("/notes");
}
