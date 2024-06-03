<template>
  <div class="board">
    <h1 class="board__title">Kanban board</h1>
    <div class="board__btn_wrapper">
      <button class="board__btn btn" @click="toggleForm">Создать задачу</button>
      <button class="board__btn btn" @click="clearLocal">Очиститть</button>
    </div>
    <ul class="board__desk_wrapper">
      <li v-for="column in boardColumns" class="board__column">
        <h2 class="column__title">{{ column }}</h2>
        <ul class="board__desk">
          <li
            v-for="taskItem in getTasksCulumnStatus(column)"
            :key="taskItem.id"
            :class="{
              board__task: true,
              board__task_blue: isTask(taskItem),
              board__task_red: isBug(taskItem),
              board__task_completed: isCompleted(taskItem),
            }"
          >
            <AppTask
              :task="taskItem"
              :column="column"
              @edited="onTaskEdited"
              @edited-task="editTask(taskItem)"
              @removed-task="removeTask(taskItem)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <AppForm
    v-if="isOpenForm"
    :taskData="taskData"
    
    @created-task="createTask"
    @closer-form="toggleForm"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Task } from "../types";

import AppTask from "./AppTask.vue";
import AppForm from "./AppForm.vue";


enum TaskType {
  Task = "Задача",
  Bug = "Баг",
}

const isBug = (task: Task) => {
  return task.type === TaskType.Bug;
};

const isTask = (task: Task) => {
  return task.type === TaskType.Task;
};

const isCompleted = (task: Task) => {
  return task.status === "Выполнено";
};

let taskId = +(localStorage.getItem("taskId") || 1);

const initTask: Task = {
  name: "",
  desk: "",
  deadline: new Date().toISOString().slice(0, 10),
  type: "Задача",
  user: "Не назначен",
  status: "К выполнению",
  id: +(localStorage.getItem("taskId") || taskId),
  isEdit: false,
};

let taskData = ref({ ...initTask });

const myForm = localStorage.getItem("myform");
let tasks = ref<Array<Task>>(myForm !== null ? JSON.parse(myForm) : []);

const boardColumns = ["К выполнению", "В работе", "Выполнено"];
const isOpenForm = ref(false);
let currentTaskId = 0;

const getTasksCulumnStatus = (column: string): Task[] => {
  return tasks.value.filter((task) => task.status === column);
};

const clearLocal = (): void => {
  localStorage.clear();
  tasks.value = [];
};

const toggleForm = (): void => {
  isOpenForm.value = !isOpenForm.value;
  updateStorage();
};

const resetTaskData = () => {
  taskData.value = { ...initTask };
  updateStorage();
  toggleForm();
};

const createTask = () => {
  const newTask = {
    ...taskData.value,
    id: taskId++,
  };

  const idxEditTask = tasks.value.findIndex(
    (task) => task.id === currentTaskId
  );

  newTask.isEdit
    ? tasks.value.splice(idxEditTask, 1, newTask)
    : tasks.value.push(newTask);
  resetTaskData();
};


const removeTask = (currentTask: Task): void => {
  tasks.value = tasks.value.filter((task) => task.id !== currentTask.id);
  updateStorage();
};

const editTask = (currentTask: Task): void => {
  taskData.value = {
    ...currentTask,
    isEdit: true,
  };
  currentTaskId = currentTask.id;
  toggleForm();
};

const onTaskEdited = (payload: { updatedTask: Task }): void => {
  const idx = tasks.value.findIndex(
    (task) => task.id === payload.updatedTask.id
  );
  tasks.value.splice(idx, 1, payload.updatedTask);
};

const updateStorage = (): void => {
  localStorage.setItem("myform", JSON.stringify(tasks.value));
  localStorage.setItem("taskId", JSON.stringify(taskId));
};

watch(tasks.value, () => {
  updateStorage();
});
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.board {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

.board__title {
  margin: 20px auto 10px auto;
  width: 250px;
  font-size: 38px;
  color: rgb(59, 51, 51);
  white-space: nowrap;
}

.board__btn_wrapper {
  margin: 0 auto;
  width: 510px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.btn {
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgb(241, 244, 248) 30%,
    rgb(149, 159, 167) 100%
  );
  color: black;
  cursor: pointer;
  border: 2px solid $color-border;

  &:hover {
    transform: scale(1.03);
  }
}

.board__btn {
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 35px;
  width: 100%;
}

.board__desk_wrapper {
  margin: 0;
  padding: 0 25px 0 25px;
  display: flex;
  justify-content: center;
}

.board__column {
  width: 100%;
  list-style: none;
  background-color: bisque;
  border: 2px solid $color-border;
}

.column__title {
  padding: 10px;
  margin: 0;
  text-align: center;
  border-bottom: 4px solid $color-border;
}

.board__desk {
  padding: 15px;
  min-height: 200px;
}

.board__task {
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  &_blue {
    background-color: rgb(85, 108, 243);
    list-style: none;
  }

  &_red {
    background-color: rgb(236, 58, 58);
    list-style: none;
  }

  &_completed &_title,
  &_completed &_desk {
    text-decoration: line-through;
  }
}

@media screen and (max-width: 770px) {
  .board__btn_wrapper {
    width: 400px;
  }

  .column__title {
    font-size: 18px;
  }
}

@media screen and (max-width: 550px) {
  .board__task {
    padding-left: 5px;
    font-size: 12px;
  }

  .board__btn {
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 35px;
    width: 100%;
  }

  .column__title {
    font-size: 13px;
    white-space: nowrap;
  }

  .board__title {
    width: 205px;
    font-size: 32px;
  }

  .board__btn_wrapper {
    width: 320px;
  }
}

@media screen and (max-width: 361px) {
  .board__task {
    padding-left: 5px;
    font-size: 10px;
  }
}
</style>
