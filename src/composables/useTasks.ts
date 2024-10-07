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



  const editTask = ( formData: Task, taskStatus: string) => {
    const idxEditTask = tasks.value.findIndex(
      (task) => task.id === formData.id
    );

    const updateTask = {
      ...formData,
      status: taskStatus,
    }
    console.log(formData, taskStatus)

    tasks.value.splice(idxEditTask, 1, updateTask);
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };


  
  const editStatusTasks = (newStatusTask: string, oldStatusTask: string) => {
    for (let task of tasks.value) {
      if (task.status === oldStatusTask) {
        task.status = newStatusTask;
      }
    }

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
    editStatusTasks,
    deleteTask
  };
};
