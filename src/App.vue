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
          v-for="task in renderTask(column)"
          :key="task.id"
          :class="{
            board__task: true,
            board__task_blue: task.type === 'Задача',
            board__task_red: task.type === 'Баг',
            board__task_completed: column === 'Выполнено',
          }"
        >
          <div class="board__task_wrapper">
            <h3 class="board__task_title">{{ task.name }}</h3>
            <p class="board__task_desk">{{ task.desk }}</p>
            <div class="board__task_deadline_wrapper">
              <p
                :class="{
                  board__task_deadline: true,
                  board__task_deadline_end: (Date.parse(task.deadline) + 86400000) < new Date().getTime() && column !== 'Выполнено',
                }"
              >
                {{ task.deadline }}
              </p>
              <b v-if="column === 'Выполнено'" class="board__task_ready">
                Завершено
              </b>
            </div>
            <p class="board__task_user">{{ task.user }}</p>

            <select
              name=""
              id=""
              v-model="task.status"
              class="board__task_status"
            >
              <option value="К выполнению">К выполнению</option>
              <option value="В работе">В работе</option>
              <option value="Выполнено">Выполнено</option>
            </select>
          </div>
          <div class="board__task_wrapper_btn">
            <button class="board__task_change btn" @click="editTask(task)">
              ..
            </button>
            <button class="board__task_delete btn" @click="removeTask(task)">
              Х
            </button>
          </div>
        </li>
      </ul>
    </div>
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
          max="2026-12-31"
        />
      </p>

      <div class="form__select--wrapper">
        <select class="form__select" name="select" v-model="task.type">
          <option value="Задача">Задача</option>
          <option value="Баг">Баг</option>
        </select>

        <select class="form__select" name="select" v-model="task.user">
          <option value="Не назначен">Не назначен</option>
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
import { ref, watch } from "vue";
// import AppForm from "./components/AppForm.vue";
// import AppBoard from "./components/AppForm.vue";
interface Task {
  name: string;
  desk: string;
  deadline: string,
  type: string;
  user: string;
  status: string;
  id: number;
  isEdit: boolean;
}

const initTask: Task = {
  name: "",
  desk: "",
  deadline: new Date().toISOString().slice(0, 10),
  type: "Задача",
  user: "Не назначен",
  status: "К выполнению",
  id: 0,
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

function updateStorage(): void {
  let storageTasks = JSON.parse(localStorage.getItem("myform"));
  if (!storageTasks) storageTasks = tasks.value;

  storageTasks = JSON.parse(JSON.stringify(tasks));
  localStorage.setItem("myform", JSON.stringify(tasks.value));
}

watch(tasks.value, () => {
  updateStorage();
});

</script>
