import { Link, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function NoteListItem({ note, index }) {
  const [formattedDate, setFormattedDate] = useState("");
  const fetcher = useFetcher();
  const date = new Date(note.createdAt);

  useEffect(() => {
    const formatDate = () => {
      const date = new Date(note.createdAt);
      const formatted = date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setFormattedDate(formatted);
    };

    if (typeof window !== "undefined") {
      formatDate();
    }
  }, [note.createdAt]);

  const handleDeleteNote = (e) => {
    e.preventDefault();
    const proceed = confirm("Are you sure you want to delete this note?");
    if (!proceed) return;
    try {
      fetcher.submit(null, { method: "delete", action: `/notes/${note.id}` });
    } catch (e) {
      throw new Error("Failed to delete note");
    }
  };
  if (fetcher.state !== "idle") {
    return (
      <article className="note-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <div>
      <Link to={"/notes/" + note.id} className="note-link">
        <article>
          <header>
            <ul className="note-meta">
              <li>#{index + 1}</li>
              <li>{formattedDate}</li>
            </ul>
            <h2>{note.title}</h2>
          </header>
          <p>{note.content}</p>
        </article>
        <div className="note-actions">
          <div>
            <FaRegTrashAlt
              onClick={(e) => handleDeleteNote(e)}
              id="delete-icon"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
