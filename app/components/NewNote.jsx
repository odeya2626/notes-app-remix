import { Form, useMatches, useNavigation } from "@remix-run/react";
import styles from "./NewNote.css";
export default function NewNote() {
  const navigation = useNavigation();
  const matches = useMatches();
  const note = matches.find(
    (match) => match.id === "routes/notes.$noteId"
  )?.data;

  const isSubmitting = navigation.state === "submitting";

  const defaultValues = note
    ? { title: note.title, content: note.content }
    : { title: "", content: "" };
  return (
    <Form method={note?.title ? "patch" : "post"} id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          defaultValue={defaultValues.title}
          id="title"
          name="title"
          required
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          defaultValue={defaultValues.content}
          name="content"
          rows="5"
          required
        />
      </p>

      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : note?.title ? "Edit Note" : "Add Note"}
        </button>
      </div>
    </Form>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
