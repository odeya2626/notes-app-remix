import styles from "./NewNote.css";
import {
  Form,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

export default function NewNote() {
  const navigation = useNavigation();
  const matches = useMatches();
  const note = matches.find(
    (match) => match.id === "routes/notes.$noteId"
  )?.data;

  const validationErrors = useActionData();

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
      {validationErrors?.message && (
        <p style={{ color: "white" }}>{validationErrors.message}</p>
      )}
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
