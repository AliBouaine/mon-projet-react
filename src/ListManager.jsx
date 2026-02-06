// ListManager.jsx
import { useState } from "react";

function ListManager({ initialItems = [], placeholder = "Ajouter un élément" }) {
  const [items, setItems] = useState(initialItems);
  const [value, setValue] = useState("");

  const addItem = () => {
    if (value.trim() !== "") {
      setItems([...items, value]);
      setValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addItem}>Ajouter</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListManager;
