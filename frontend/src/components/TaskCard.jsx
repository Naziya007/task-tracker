import { useState } from "react";

import { useTask } from "../context/TaskContext";
import { FiEdit2, FiTrash2, FiCalendar, FiAlertTriangle } from "react-icons/fi";
import styles from "./TaskCard.module.css";

const PRIORITY_LABELS = { high: "High", medium: "Medium", low: "Low" };
const STATUS_NEXT = { todo: "in-progress", "in-progress": "completed", completed: "todo" };
const STATUS_LABELS = { todo: "To Do", "in-progress": "In Progress", completed: "Done" };

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === "completed") return false;
  return new Date(dateStr) < new Date();
}

export default function TaskCard({ task, onEdit }) {
  const { deleteTask, updateTaskStatus } = useTask();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    await deleteTask(task._id);
  };

  const handleStatusCycle = () => {
    updateTaskStatus(task._id, STATUS_NEXT[task.status]);
  };

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className={`${styles.card} ${styles[`status_${task.status.replace("-", "_")}`]} fade-in`}>
      <div className={styles.topRow}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[`priority_${task.priority}`]}`}>
            <span className={styles.dot} />
            {PRIORITY_LABELS[task.priority]}
          </span>
          <button
            className={`${styles.statusBadge} ${styles[`statusColor_${task.status.replace("-", "_")}`]}`}
            onClick={handleStatusCycle}
            title="Click to change status"
          >
            {STATUS_LABELS[task.status]}
          </button>
        </div>

        <div className={styles.cardActions}>
          <button className={styles.editBtn} onClick={() => onEdit(task)} title="Edit task">
            <FiEdit2 size={14} />
          </button>
          <button
            className={`${styles.deleteBtn} ${confirmDelete ? styles.confirmDelete : ""}`}
            onClick={handleDelete}
            disabled={deleting}
            title={confirmDelete ? "Click again to confirm" : "Delete task"}
            onBlur={() => setConfirmDelete(false)}
          >
            {deleting ? "..." : confirmDelete ? "Sure?" : <FiTrash2 size={14} />}
          </button>
        </div>
      </div>

      <h3 className={`${styles.title} ${task.status === "completed" ? styles.completed : ""}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      {task.tags?.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {task.dueDate && (
          <span className={`${styles.dueDate} ${overdue ? styles.overdue : ""}`}>
            {overdue ? <FiAlertTriangle size={12} /> : <FiCalendar size={12} />}
            {formatDate(task.dueDate)}
          </span>
        )}
        <span className={styles.createdAt}>
          {new Date(task.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
      </div>
    </div>
  );
}
