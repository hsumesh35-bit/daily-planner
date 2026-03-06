import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
const [priorities, setPriorities] = useState(["", "", ""]);
const [notes, setNotes] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("planner_tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("planner_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (i) => {
    const copy = [...tasks];
    copy[i].done = !copy[i].done;
    setTasks(copy);
  };

  const del = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

 return (
  <div className="container">
    <h1>Daily Planner</h1>

    <div className="section">
      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    <div className="section">
      <h3>Top 3 Priorities</h3>
      {priorities.map((p, i) => (
        <input
          key={i}
          value={p}
          onChange={(e) => {
            const updated = [...priorities];
            updated[i] = e.target.value;
            setPriorities(updated);
          }}
          placeholder={`Priority ${i + 1}`}
        />
      ))}
    </div>

    <div className="input-row">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>
    </div>

    <ul>
      {tasks.map((t, i) => (
        <li key={i}>
          <span
            onClick={() => toggleTask(i)}
            className={t.done ? "done" : ""}
          >
            {t.text}
          </span>
          <button onClick={() => del(i)}>✕</button>
        </li>
      ))}
    </ul>

    <div className="section">
      <h3>Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here"
        rows="5"
      />
    </div>
  </div>
);
      ))}
    </ul>
  </div>
);
}
