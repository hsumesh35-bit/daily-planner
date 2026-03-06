import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [priorities, setPriorities] = useState(["", "", ""]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("planner_tasks");
    const savedDate = localStorage.getItem("planner_date");
    const savedPriorities = localStorage.getItem("planner_priorities");
    const savedNotes = localStorage.getItem("planner_notes");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedDate) setDate(savedDate);
    if (savedPriorities) setPriorities(JSON.parse(savedPriorities));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("planner_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("planner_date", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("planner_priorities", JSON.stringify(priorities));
  }, [priorities]);

  useEffect(() => {
    localStorage.setItem("planner_notes", notes);
  }, [notes]);

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

  const del = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  return (
    <div className="app-bg">
      <div className="container">
        <div className="top-bar">
          <p className="mini-title">Your Premium Planner</p>
          <h1>Daily Planner</h1>
          <p className="subtitle">Plan smart. Stay focused. Finish strong.</p>
        </div>

        <div className="card">
          <div className="section">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="card">
          <div className="section">
            <div className="section-head">
              <h3>Top 3 Priorities</h3>
              <span className="badge">Most Important</span>
            </div>

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
                className="priority-input"
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section">
            <div className="section-head">
              <h3>Tasks</h3>
              <span className="badge soft">Quick List</span>
            </div>

            <div className="input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter next task"
              />
              <button onClick={addTask}>Add</button>
            </div>

            <ul className="task-list">
              {tasks.map((t, i) => (
                <li key={i} className="task-item">
                  <span
                    onClick={() => toggleTask(i)}
                    className={t.done ? "done task-text" : "task-text"}
                  >
                    {t.text}
                  </span>
                  <button className="delete-btn" onClick={() => del(i)}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="section">
            <div className="section-head">
              <h3>Notes</h3>
              <span className="badge soft">Ideas & Reminders</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
              rows="8"
              className="notes-box"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
