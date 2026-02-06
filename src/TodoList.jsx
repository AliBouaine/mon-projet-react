// TodoList.jsx
import { useState } from "react";

function TodoList({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Moyenne");
  const [search, setSearch] = useState("");

  const addTask = () => {
    if (name.trim() !== "") {
      setTasks([
        ...tasks,
        { name, priority, completed: false },
      ]);
      setName("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div>
      <input
        placeholder="Nom de la tâche"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select onChange={(e) => setPriority(e.target.value)}>
        <option>Haute</option>
        <option>Moyenne</option>
        <option>Basse</option>
      </select>

      <button onClick={addTask}>Ajouter</button>

      <input
        placeholder="Rechercher..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Total des taches: {tasks.length} </p>
      <p>Taches Terminées : {completedCount}</p>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.name} ({task.priority})
            </span>
            <button onClick={() => toggleTask(index)}>✔</button>
            <button onClick={() => setTasks(tasks.filter((_, i) => i !== index))}>❌</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default TodoList;
