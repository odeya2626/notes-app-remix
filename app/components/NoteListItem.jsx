import { Link } from "@remix-run/react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function NoteListItem({ note, index }) {
  const handleDeleteNote = (e) => {
    e.stopPropagation();
    console.log("delte");
  };

  return (
    <Link to={"/" + note.id} className="note-link">
      <article>
        <header>
          <ul className="note-meta">
            <li>#{index + 1}</li>
            <li>
              <time dateTime={note.id}>
                {new Date(note.id).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </li>
          </ul>
          <h2>{note.title}</h2>
        </header>
        <p>{note.content}</p>
      </article>
      <div className="note-actions">
        <div onClick={(e) => handleDeleteNote(e)} id="delete-icon">
          <FaRegTrashAlt />
        </div>
      </div>
    </Link>
  );
}
