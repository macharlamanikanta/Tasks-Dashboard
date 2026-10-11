
import { useId, useRef, useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const formKey = editingTask
    ? editingTask.id ?? editingTask.title ?? "editing-task"
    : "new-task";

  return (
    <TaskFormFields
      key={formKey}
      onSubmit={onSubmit}
      editingTask={editingTask}
      onCancelEdit={onCancelEdit}
    />
  );
}

function TaskFormFields({ onSubmit, editingTask, onCancelEdit }) {
  const titleId = useId();
  const priorityId = useId();
  const inputRef = useRef(null);

  const [title, setTitle] = useState(() => editingTask?.title ?? "");
  const [priority, setPriority] = useState(
    () => editingTask?.priority ?? "Medium"
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      priority
    });

    if (!editingTask) {
      setTitle("");
      setPriority("Medium");
      inputRef.current?.focus();
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={titleId}>Task name</label>
        <input
          ref={inputRef}
          id={titleId}
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="What do you need to do?"
          required
        />
      </div>

      <div className="field">
        <label htmlFor={priorityId}>Priority</label>
        <select
          id={priorityId}
          value={priority}
          onChange={event => setPriority(event.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-buttons">
        <button className="primary-btn" type="submit">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>

        {editingTask && (
          <button
            className="secondary-btn"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
