import { Task } from "../types";
import { ref, watch } from "vue";

let taskId = +(localStorage.getItem("taskId") || 1);
export let taskDataEdit: {};
export let isNotFilledInput = ref({ name: false, desk: false });

const myForm = localStorage.getItem("myform");
export let tasks = ref<Array<Task>>(myForm !== null ? JSON.parse(myForm) : []);

const updateStorage = (): void => {
  localStorage.setItem("myform", JSON.stringify(tasks.value));
  localStorage.setItem("taskId", JSON.stringify(taskId || 1));
};

export const useChangeTasks = () => {
  return {
    createTask(taskData: Task) {
      const newTask = {
        ...taskData,
        id: taskId++,
      };

      tasks.value.push(newTask);
    },

    editTask(taskData: Task) {
      const newTask = {
        ...taskData,
      };
      const idxEditTask = tasks.value.findIndex(
        (task) => task.id === taskData.id
      );
      tasks.value.splice(idxEditTask, 1, newTask);
    },

    editTaskStatus(event: Event, currentTask: Task) {
      const value = (event.target as HTMLInputElement).value;
      const updatedTask = {
        ...currentTask,
        status: value,
      };
      const idx = tasks.value.findIndex((task) => task.id === currentTask.id);
      tasks.value.splice(idx, 1, updatedTask);
    },

    removeTask(currentTask: Task): void {
      tasks.value = tasks.value.filter((task) => task.id !== currentTask.id);
      updateStorage();
    },
  };
};

watch(tasks.value, () => {
  updateStorage();
});
