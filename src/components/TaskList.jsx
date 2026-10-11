
function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-state">
        No tasks found. Add a task to get started!
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <article className="task-card" key={task.id}>
          <button
            type="button"
            className={`task-check ${
              task.completed ? "checked" : ""
            }`}
            onClick={() => onToggle(task.id)}
            aria-label={
              task.completed
                ? `Mark ${task.title} as pending`
                : `Complete ${task.title}`
            }
          >
            {task.completed ? "✓" : ""}
          </button>

          <div className="task-info">
            <h3 className={task.completed ? "done" : ""}>
              {task.title}
            </h3>

            <p>
              {task.completed ? "Completed" : "Ready when you are"}
            </p>
          </div>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <div className="task-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
