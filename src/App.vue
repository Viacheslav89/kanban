<template>
  <div class="board">
    <h1 class="kanban_title">Kanban board</h1>
    <div class="board__btn_wrapper">
      <button class="board__btn btn" @click="toggleForm()">
        Создать задачу
      </button>
      <button class="board__btn btn" @click="clearTasks()">Очистить</button>
    </div>
    <div class="board__column board__title--wrapper">
      <h2 class="board__title">К выполнению</h2>
      <h2 class="board__title">В работе</h2>
      <h2 class="board__title">Выполнено</h2>
    </div>
    <div class="board__column board__desk--wrapper">
      <ul v-for="column in taskColumns" :key="column" class="board__desk">
        <li
          v-for="taskItem in renderTask(column)"
          :key="taskItem.id"
          :class="{
            board__task: true,
            board__task_blue: taskItem.type === 'Задача',
            board__task_red: taskItem.type === 'Баг',
            board__task_completed: column === 'Выполнено',
          }"
        >
          <AppTask :task="taskItem" :column="column" @edited="onTaskEdited" />

          <div class="board__task_wrapper_btn">
            <button class="board__task_change btn" @click="editTask(taskItem)">
              ..
            </button>
            <button
              class="board__task_delete btn"
              @click="removeTask(taskItem)"
            >
              Х
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="form" v-if="isOpenForm">
    <div class="form__wrapper">
      <AppForm :task="task" />

      <div class="form__select--wrapper"></div>
      <div class="form__btn--wrapper">
        <button class="form__btn btn" @click="createTask()">Создать</button>
        <button class="form__btn btn" @click="сancelForm()">Отменить</button>
      </div>
    </div>
    <div class="form__overloy"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AppTask from "./components/AppTask.vue";
import AppForm from "./components/AppForm.vue";

import { Task } from "./types";

const initTask: Task = {
  name: "",
  desk: "",
  deadline: new Date().toISOString().slice(0, 10),
  type: "Задача",
  user: "Не назначен",
  status: "К выполнению",
  id: +localStorage.getItem("taskId") || 0,
  isEdit: false,
};

let tasks = ref<Array<Task>>(JSON.parse(localStorage.getItem("myform")) || []);

const taskColumns = ["К выполнению", "В работе", "Выполнено"];
const isOpenForm = ref(false);
let currentTaskIdx = 0;
let task = ref(initTask);

function renderTask(column: string): Task[] {
  return tasks.value.filter((task) => task.status === column);
}

function clearTasks(): void {
  tasks.value = [];
  localStorage.clear();
}

function toggleForm(): void {
  isOpenForm.value = !isOpenForm.value;
}

function createTask(): void {
  task.value = { ...initTask };

  initTask.isEdit
    ? tasks.value.splice(currentTaskIdx, 1, task.value)
    : tasks.value.push(task.value);

  initTask.id++;
  task.value.isEdit = false;
  task = ref(initTask);
  сancelForm();
}

function removeTask(currentTask: Task): void {
  currentTaskIdx = tasks.value.indexOf(currentTask);
  tasks.value.splice(currentTaskIdx, 1);
}

function editTask(currentTask: Task): void {
  for (let key in task.value) {
    task.value[key] = currentTask[key];
  }

  task.value.isEdit = true;
  currentTaskIdx = tasks.value.indexOf(currentTask);
  toggleForm();
}

function сancelForm(): void {
  task.value.isEdit = false;
  toggleForm();
  claerForm();
}

function claerForm(): void {
  task.value.name = "";
  task.value.desk = "";
}

function onTaskEdited(payload: { updatedTask: Task }) {
  // console.log("onTaskEdited >>>", JSON.parse(JSON.stringify(payload)));

  const idx = tasks.value.findIndex(
    (task) => task.id === payload.updatedTask.id
  );
  tasks.value.splice(idx, 1, payload.updatedTask);
}

function updateStorage(): void {
  // let storageTasks = JSON.parse(localStorage.getItem("myform"));
  // if (!storageTasks) storageTasks = tasks.value;

  // storageTasks = JSON.parse(JSON.stringify(tasks));
  localStorage.setItem("myform", JSON.stringify(tasks.value));
  localStorage.setItem("taskId", JSON.stringify(initTask.id));
}

watch(tasks.value, () => {
  updateStorage();
});
</script>
