import { createContext, useContext, useReducer, useCallback } from "react";
import { taskAPI } from "../utils/api";
import toast from "react-hot-toast";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  stats: [],
  loading: false,
  error: null,
  filters: { status: "all", priority: "all", sortBy: "createdAt", order: "desc", search: "" },
};

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_TASKS":
      return { ...state, tasks: action.payload.tasks, stats: action.payload.stats, loading: false, error: null };
    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (filters = state.filters) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const params = {};
      if (filters.status !== "all") params.status = filters.status;
      if (filters.priority !== "all") params.priority = filters.priority;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.order) params.order = filters.order;
      if (filters.search) params.search = filters.search;

      const { data } = await taskAPI.getAll(params);
      dispatch({ type: "SET_TASKS", payload: { tasks: data.tasks, stats: data.stats } });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.response?.data?.message || "Failed to fetch tasks" });
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const { data } = await taskAPI.create(taskData);
      dispatch({ type: "ADD_TASK", payload: data.task });
      toast.success("Task created!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create task";
      toast.error(msg);
      return { success: false, message: msg };
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const { data } = await taskAPI.update(id, taskData);
      dispatch({ type: "UPDATE_TASK", payload: data.task });
      toast.success("Task updated!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update task";
      toast.error(msg);
      return { success: false, message: msg };
    }
  }, []);

  const updateTaskStatus = useCallback(async (id, status) => {
    try {
      const { data } = await taskAPI.updateStatus(id, status);
      dispatch({ type: "UPDATE_TASK", payload: data.task });
      toast.success(`Moved to ${status.replace("-", " ")}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskAPI.delete(id);
      dispatch({ type: "DELETE_TASK", payload: id });
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  }, []);

  return (
    <TaskContext.Provider
      value={{ ...state, fetchTasks, createTask, updateTask, updateTaskStatus, deleteTask, setFilters }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used within TaskProvider");
  return ctx;
};
