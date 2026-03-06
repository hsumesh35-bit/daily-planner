import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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
    <div style={{fontFamily:'Arial',maxWidth:500,margin:'40px auto',padding:20}}>
      <h1>Daily Planner</h1>
      <div style={{display:'flex',gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter task" style={{flex:1,padding:10}}/>
        <button onClick={addTask}>Add</button>
      </div>
      <ul style={{listStyle:'none',padding:0,marginTop:20}}>
        {tasks.map((t,i)=>(
          <li key={i} style={{display:'flex',justifyContent:'space-between',padding:8,borderBottom:'1px solid #eee'}}>
            <span onClick={()=>toggleTask(i)} style={{textDecoration:t.done?'line-through':'none',cursor:'pointer'}}>{t.text}</span>
            <button onClick={()=>del(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
