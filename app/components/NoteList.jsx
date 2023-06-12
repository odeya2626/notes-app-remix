import { Link } from "@remix-run/react";
import styles from "./NoteList.css";
import NoteListItem from "./NoteListItem";

function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <NoteListItem note={note} index={index} />
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
