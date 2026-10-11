
import { useReducer, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";

import "./App.css";

function taskReducer(tasks, action) {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];

    case "UPDATE":
      return tasks.map(task =>
        task.id === action.task.id
          ? action.task
          : task
      );

    case "TOGGLE":
      return tasks.map(task =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE":
      return tasks.filter(task => task.id !== action.id);

    default:
      return tasks;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [editingTask, setEditingTask] = useState(null);

  function saveTask(formValues) {
    if (editingTask) {
      dispatch({
        type: "UPDATE",
        task: {
          ...editingTask,
          ...formValues
        }
      });

      setEditingTask(null);
    } else {
      dispatch({
        type: "ADD",
        task: {
          id: crypto.randomUUID(),
          ...formValues,
          completed: false
        }
      });
    }
  }

  function toggleTask(id) {
    dispatch({ type: "TOGGLE", id });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", id });

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>FocusFlow</span>
        </div>

        <div className="profile">
          <div className="avatar">M</div>
          <span>My Workspace</span>
        </div>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Make today count.</h1>
          <p className="subtitle">
            Stay focused, organize your work, and get things done.
          </p>
        </div>

        <div className="welcome-icon">✦</div>
      </section>

      <Stats tasks={tasks} />

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>{editingTask ? "Edit Task" : "My Tasks"}</h2>
            <p>Everything you need to get done.</p>
          </div>
        </div>

        <TaskForm
          key={editingTask?.id ?? "new-task"}
          onSubmit={saveTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </section>

      <footer>Built with React · One task at a time.</footer>
    </main>
  );
}

export default App;
