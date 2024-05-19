<template>
  <div class="board">
    <h1 class="kanban_title">Kanban board</h1>
    <div class="board__btn_wrapper">
      <button class="board__btn btn" @click="toggleForm()">
        Создать задачу
      </button>
      <button class="board__btn btn" @click="clearTasks()">Очистить</button>
    </div>
    <ul class="board__desk--wrapper">
      <li v-for="column in taskColumns" :key="column" class="board__column">
        <h2 class="board__title">{{ column }}</h2>
        <ul class="board__desk">
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
    :task="task"
    @created-task="createTask"
    @closer-form="сancelForm"
  />
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
  id: +(localStorage.getItem("taskId") || 0),
  isEdit: false,
};

const myForm = localStorage.getItem("myform");
let tasks = ref<Array<Task>>(myForm !== null ? JSON.parse(myForm) : []);

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
  const idx = tasks.value.findIndex(
    (task) => task.id === payload.updatedTask.id
  );
  tasks.value.splice(idx, 1, payload.updatedTask);
}

function updateStorage(): void {
  localStorage.setItem("myform", JSON.stringify(tasks.value));
  localStorage.setItem("taskId", JSON.stringify(initTask.id));
}

watch(tasks.value, () => {
  updateStorage();
});
</script>
