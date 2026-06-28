import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";
import styles from "./FilterBar.module.css";

export default function FilterBar() {
  const { filters, setFilters, fetchTasks } = useTask();
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      const newFilters = { ...filters, search: searchInput };
      setFilters(newFilters);
      fetchTasks(newFilters);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchTasks(newFilters);
  };

  const handleReset = () => {
    setSearchInput("");
    const reset = { status: "all", priority: "all", sortBy: "createdAt", order: "desc", search: "" };
    setFilters(reset);
    fetchTasks(reset);
  };

  const isFiltered = filters.status !== "all" || filters.priority !== "all" || filters.search || filters.sortBy !== "createdAt";

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}></span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={styles.search}
        />
        {searchInput && (
          <button className={styles.clearSearch} onClick={() => setSearchInput("")}>✕</button>
        )}
      </div>

      <div className={styles.controls}>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className={styles.select}
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className={styles.select}
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>



        <select
          value={`${filters.sortBy}_${filters.order}`}
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split("_");
            const newFilters = { ...filters, sortBy, order };
            setFilters(newFilters);
            fetchTasks(newFilters);
          }}
          className={styles.select}
        >
          <option value="createdAt_desc">Newest First</option>
          <option value="createdAt_asc">Oldest First</option>
          <option value="dueDate_asc">Due Date ↑</option>
          <option value="dueDate_desc">Due Date ↓</option>
          <option value="priority_desc">Priority ↓</option>
          <option value="title_asc">Title A–Z</option>
        </select>

        {isFiltered && (
          <button className={styles.resetBtn} onClick={handleReset} title="Clear filters">
            ✕ Reset
          </button>
        )}
      </div>
    </div>
  );
}
