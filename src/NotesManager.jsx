// NotesManager.jsx
import { useState } from "react";

function NotesManager({ initialNotes = [] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [value, setValue] = useState("");

  const addNote = () => {
    const note = Number(value);
    if (note >= 0 && note <= 20) {
      setNotes([...notes, note]);
      setValue("");
    }
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const average =
    notes.length > 0
      ? (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2)
      : 0;

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addNote}>Ajouter</button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => removeNote(index)}>❌</button>
          </li>
        ))}
      </ul>

      <p>Moyenne : {average}</p>
    </div>
  );
}

export default NotesManager;
