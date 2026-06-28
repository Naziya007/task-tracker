import { useTask } from "../context/TaskContext";
import styles from "./StatsBar.module.css";

export default function StatsBar() {
  const { tasks, stats } = useTask();

  const counts = { todo: 0, "in-progress": 0, completed: 0 };
  tasks.forEach((t) => { if (counts[t.status] !== undefined) counts[t.status]++; });
  const total = tasks.length;
  const completionPct = total > 0 ? Math.round((counts.completed / total) * 100) : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.num}>{total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={`${styles.stat} ${styles.todo}`}>
        <span className={styles.num}>{counts.todo}</span>
        <span className={styles.label}>To Do</span>
      </div>
      <div className={`${styles.stat} ${styles.inProgress}`}>
        <span className={styles.num}>{counts["in-progress"]}</span>
        <span className={styles.label}>In Progress</span>
      </div>
      <div className={`${styles.stat} ${styles.completed}`}>
        <span className={styles.num}>{counts.completed}</span>
        <span className={styles.label}>Done</span>
      </div>

      {total > 0 && (
        <div className={styles.progress}>
          <div className={styles.progressLabel}>
            <span>Progress</span>
            <span className={styles.pct}>{completionPct}%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${completionPct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
