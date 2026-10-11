function Stats({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const pending = total - completed;

  return (
    <section className="stats">
      <article className="stat-card">
        <div className="stat-top">
          <span>Total Tasks</span>
          <span className="stat-icon">▤</span>
        </div>
        <strong>{total}</strong>
        <div className="stat-bar">
          <span style={{ width: "100%" }} />
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-top">
          <span>Pending</span>
          <span className="stat-icon">◷</span>
        </div>
        <strong>{pending}</strong>
        <div className="stat-bar">
          <span
            style={{
              width: `${total ? (pending / total) * 100 : 0}%`
            }}
          />
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-top">
          <span>Completed</span>
          <span className="stat-icon">✓</span>
        </div>
        <strong>{completed}</strong>
        <div className="stat-bar">
          <span
            style={{
              width: `${total ? (completed / total) * 100 : 0}%`
            }}
          />
        </div>
      </article>
    </section>
  );
}

export default Stats;
