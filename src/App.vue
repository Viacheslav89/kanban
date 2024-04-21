<template>
  <div class="board">
    <div class="board__column board__title--wrapper">
      <h2 class="board__title">К выполнению</h2>
      <h2 class="board__title">В работе</h2>
      <h2 class="board__title">Выполнено</h2>
    </div>
    <div class="board__column board__desk--wrapper">
      <ul v-for="column in taskColumns" :key="column" class="board__desk">
        <li
          v-for="(task, idx) in renderTask(column)"
          :key="task.id"
          class="board__task"
          :class="{
            board__task_blue: task.type === 'Задача',
            board__task_red: task.type === 'Баг',
            board__task_completed: column === 'Выполнено',
          }"
        >
          <div class="board__wrapper-desk">
            <h3 class="board__task-title">{{ task.name }}</h3>
            <p>{{ task.desk }}</p>
            <p>{{ task.deadline }}</p>
            <p>{{ task.user }}</p>

            <select name="" id="" v-model="task.status">
              <option value="К выполнению">К выполнению</option>
              <option value="В работе">В работе</option>
              <option value="Выполнено">Выполнено</option>
            </select>
            <b v-if="column === 'Выполнено'">Завершено</b>
          </div>
          <div class="board__wrapper_btn">
            <button class="board__changeTask btn" @click="editTask(idx)">
              ..
            </button>
            <button class="board__deleteTask btn" @click="removeTask(idx)">
              X
            </button>
          </div>
        </li>
      </ul>
    </div>
    <button class="board__btn btn" @click="toggleForm()">Создать задачу</button>
    <button class="board__btn btn" @click="clearTasks()">Очистить</button>
    <button class="form__btn btn" @click="console.log(tasks)">tasks</button>
  </div>

  <div class="form" v-if="isOpenForm">
    <div class="form__wrapper">
      <h2 class="form__title">Форма</h2>
      <p class="form__desc">
        Название задачи: <br />
        <input
          v-model="task.name"
          class="form__input"
          type="text"
          placeholder="Покормить кота"
        />
      </p>
      <p class="form__desc">
        Описание: <br />
        <input
          v-model="task.desk"
          class="form__input"
          type="text"
          placeholder="Дать рыбку в обед"
        />
      </p>
      <p class="form__desc">
        Дедлайн: <br />
        <input
          v-model="task.deadline"
          class="form__input"
          type="date"
          :min="newData"
          max="2026-12-31"
        />
      </p>

      <div class="form__select--wrapper">
        <select class="form__select" name="select" v-model="task.type">
          <option value="Задача" selected>Задача</option>
          <option value="Баг">Баг</option>
        </select>

        <select class="form__select" name="select" v-model="task.user">
          <option value="Johnny Depp">Johnny Depp</option>
          <option value="Leonardo DiCaprio">Leonardo DiCaprio</option>
          <option value="Beb Affleck">Ben Affleck</option>
        </select>
      </div>
      <div class="form__btn--wrapper">
        <button class="form__btn btn" @click="createTask()">Создать</button>
        <button class="form__btn btn" @click="сancelForm()">Отменить</button>
      </div>
    </div>
    <div class="form__overloy"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
// import AppForm from "./components/AppForm.vue";
// import AppBoard from "./components/AppForm.vue";
interface Task {
  name: string;
  desk: string;
  deadline: string;
  type: string;
  user: string;
  status: string;
  id: number;
  isEdit: boolean;
}

let tasks = ref<Array<Task>>(JSON.parse(localStorage.getItem("myform")) || []);

const taskColumns = ["К выполнению", "В работе", "Выполнено"];

const isOpenForm = ref(false);
const newData = new Date().toISOString().slice(0, 10);

function renderTask(column) {
  return tasks.value.filter((task) => task.status === column);
}

let currentTaskIdx = 0;

const initTask: Task = {
  name: "",
  desk: "",
  deadline: newData,
  type: "",
  user: "",
  status: "К выполнению",
  id: 0,
  isEdit: false,
};

let task = ref(initTask);

function clearTasks() {
  tasks.value = [];
  localStorage.clear();
}

function toggleForm() {
  isOpenForm.value = !isOpenForm.value;
}

function createTask() {
  task.value = { ...initTask };

  initTask.isEdit
    ? tasks.value.splice(currentTaskIdx, 1, task.value)
    : tasks.value.push(task.value);

  initTask.id++;
  task.value.isEdit = false;
  task = ref(initTask);
  сancelForm();
  updateStorage();
}

function removeTask(idx) {
  tasks.value.splice(idx, 1);
  updateStorage();
}

function editTask(idx) {
  toggleForm();
  for (let key in task.value) {
    task.value[key] = tasks.value[idx][key];
  }

  task.value.isEdit = true;
  currentTaskIdx = idx;
}

function сancelForm() {
  task.value.isEdit = false;
  toggleForm();
  claerForm();
}

function claerForm() {
  task.value.name = "";
  task.value.desk = "";
}

function updateStorage() {
  let storageTasks = JSON.parse(localStorage.getItem("myform"));
  if (!storageTasks) storageTasks = tasks.value;

  storageTasks = JSON.parse(JSON.stringify(tasks));
  localStorage.setItem("myform", JSON.stringify(tasks.value));
}
</script>
