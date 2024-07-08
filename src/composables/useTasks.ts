import { Task } from "../types";
import { ref } from "vue";

const tasks = ref<Array<Task>>(JSON.parse((localStorage.getItem("tasks")) || '[]'));

export const useTasks = () => {
  const createTask = (formData: Task) => {
    const newTask = {
      ...formData,
      id: +(localStorage.getItem("taskId") || 1) + 1,
    };
    tasks.value.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
    localStorage.setItem("taskId", JSON.stringify(newTask.id));
  };

  const editTask = ( formData: Task) => {
    const idxEditTask = tasks.value.findIndex(
      (task) => task.id === formData.id
    );
    tasks.value.splice(idxEditTask, 1, formData);
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };
  
  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  return {
    tasks,
    createTask,
    editTask,
    deleteTask
  };
};
