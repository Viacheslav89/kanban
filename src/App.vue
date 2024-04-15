<template>
  <div class="board">
    <div class="board__column board__title--wrapper">
      <h2 class="board__title">К выполнению</h2>
      <h2 class="board__title">В работе</h2>
      <h2 class="board__title">Выполнено</h2>
    </div>
    <div class="board__column board__desk--wrapper">
      <ul class="board__desk">
        <li
          v-for="(task, idx) in toImplementationTasks"
          :key="task.id"
          class="board__task"
          :class="
            task.type === 'Задача' ? 'board__task_blue' : 'board__task_red'
          "
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
          </div>
          <div>
            <button class="board__changeTask btn" @click="editTask(idx)">
              ..
            </button>
            <button class="board__deleteTask btn" @click="removeTask(idx)">
              X
            </button>
          </div>
        </li>
      </ul>

      <ul class="board__desk">
        <li
          v-for="task in inWorkTasks"
          :key="task.id"
          class="board__task"
          :class="
            task.type === 'Задача' ? 'board__task_blue' : 'board__task_red'
          "
        >
          <div class="board__wrapper">
            <h3 class="board__task-title">{{ task.name }}</h3>
            <p>{{ task.desk }}</p>
            <p>{{ task.deadline }}</p>
            <p>{{ task.user }}</p>

            <select name="" id="" v-model="task.status">
              <option value="К выполнению">К выполнению</option>
              <option value="В работе">В работе</option>
              <option value="Выполнено">Выполнено</option>
            </select>
          </div>
          <button class="board__deleteTask btn">X</button>
        </li>
      </ul>

      <ul class="board__desk">
        <li
          v-for="task in completedTasks"
          :key="task.id"
          class="board__task"
          :class="
            task.type === 'Задача' ? 'board__task_blue' : 'board__task_red'
          "
        >
          <div class="board__wrapper">
            <h3 class="board__task-title">{{ task.name }}</h3>
            <p>{{ task.desk }}</p>
            <p>{{ task.deadline }}</p>
            <p>{{ task.user }}</p>

            <select name="" id="" v-model="task.status">
              <option value="К выполнению">К выполнению</option>
              <option value="В работе">В работе</option>
              <option value="Выполнено">Выполнено</option>
            </select>
          </div>
          <button class="board__deleteTask btn">X</button>
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
      <!-- <p>sdbfdsmbnf</p> -->
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
    <div class="form__overloy">

    </div>
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

const isOpenForm = ref(false);
const newData = new Date().toISOString().slice(0, 10);

const toImplementationTasks = computed(() => {
  return tasks.value.filter((task) => task.status === "К выполнению");
});

const inWorkTasks = computed(() => {
  return tasks.value.filter((task) => task.status === "В работе");
});

const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.status === "Выполнено");
});

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
  if(initTask.isEdit) {
    const index = tasks.value.indexOf(task.value);
    console.log(index);
    tasks.value.push(task.value);
  }

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
  task.value.name = tasks.value[idx].name;
  task.value.desk = tasks.value[idx].desk;
  task.value.deadline = tasks.value[idx].deadline;
  task.value.type = tasks.value[idx].type;
  task.value.user = tasks.value[idx].user;
  task.value.user = tasks.value[idx].user;
  task.value.status = tasks.value[idx].status;
  task.value.isEdit = true;
}

function сancelForm() {
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
