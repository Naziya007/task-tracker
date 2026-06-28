import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskProvider, useTask } from "./context/TaskContext";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";
import { FiPlus, FiAlertTriangle, FiClipboard } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import styles from "./App.module.css";

function TaskList() {
  const { tasks, loading, error, fetchTasks } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditTask(null);
  };

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <BsLightningChargeFill className={styles.logoIcon} />
          <span className={styles.logoText}>TaskFlow</span>
        </div>
        <button className={styles.newTaskBtn} onClick={() => setShowForm(true)}>
          <FiPlus size={16} /> New Task
        </button>
      </header>

      <main className={styles.main}>
        {/* Stats */}
        <section className={styles.statsSection}>
          <StatsBar />
        </section>

        {/* Filters */}
        <section className={styles.filterSection}>
          <FilterBar />
        </section>

        {/* Task Grid */}
        <section className={styles.taskSection}>
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading tasks...</p>
            </div>
          )}

          {error && !loading && (
            <div className={styles.errorState}>
              <FiAlertTriangle size={40} />
              <p>{error}</p>
              <button onClick={() => fetchTasks()}>Try Again</button>
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className={styles.emptyState}>
              <FiClipboard className={styles.emptyIcon} />
              <h3>No tasks yet</h3>
              <p>Create your first task to get started.</p>
              <button className={styles.emptyBtn} onClick={() => setShowForm(true)}>
                <FiPlus size={15} /> Create Task
              </button>
            </div>
          )}

          {!loading && tasks.length > 0 && (
            <div className={styles.grid}>
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {showForm && <TaskForm task={editTask} onClose={handleClose} />}
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e2334",
            color: "#f1f5f9",
            border: "1px solid #2a3045",
            borderRadius: "10px",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#0f1117" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0f1117" } },
        }}
      />
      <TaskList />
    </TaskProvider>
  );
}
