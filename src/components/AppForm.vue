<template>
  <div class="form">
    <div class="form__wrapper">
      <h2 class="form__title">Форма</h2>
      <p class="form__desc">
        Название задачи: <br />
        <input
          :class="{
            form__input: true,
            form__desk_filled: isNotFilledInput.name,
          }"
          v-model="formData.name"
          class="form__input"
          type="text"
          placeholder="Покормить кота"
        />
      </p>
      <p class="form__desc">
        Описание: <br />
        <input
          :class="{
            form__input: true,
            form__desk_filled: isNotFilledInput.desk,
          }"
          v-model="formData.desk"
          type="text"
          placeholder="Дать рыбку в обед"
        />
      </p>
      <p class="form__desc">
        Дедлайн: <br />
        <input
          v-model="formData.deadline"
          class="form__input"
          type="date"
          min=""
          max="2026-12-31"
        />
      </p>
      <div class="form__selects_wrapper">
        <div class="form__select_wrapper">
          Вид задачи:
          <select class="form__select" name="select" v-model="formData.type">
            <option value="Задача">Задача</option>
            <option value="Баг">Баг</option>
          </select>
        </div>

        <div class="form__select--wrapper">
          Исполнитель:
          <select class="form__select" name="select" v-model="formData.user">
            <option value="Спанч Боб">Спанч Боб</option>
            <option value="Патрик">Патрик</option>
            <option value="Сквидвард">Сквидвард</option>
          </select>
        </div>
      </div>
      <div class="form__btn--wrapper">
        <button class="form__btn btn" @click="createdTask">
          {{ editCreateBtn }}
        </button>
        <button class="form__btn btn" @click="closerForm">Отменить</button>
      </div>
    </div>
    <div class="form__overloy"></div>
  </div>
</template>

<script setup lang="ts">
import { Task } from "../types";
import { useTasks } from "../composables/useTasks";
import { ref } from "vue";

const props = defineProps<{
  isEditTask: boolean;
  task?: Task;
}>();

const initTask: Task = {
  name: "",
  desk: "",
  deadline: new Date().toISOString().slice(0, 10),
  type: "Задача",
  user: "Не назначен",
  status: "К выполнению",
  id: +(localStorage.getItem("taskId") || 1),
  isEdit: false,
};

let formData = ref(
  props.isEditTask && props.task
    ? { ...props.task, isEdit: true }
    : { ...initTask }
);

let isNotFilledInput = ref({ name: false, desk: false });
const editCreateBtn = props.isEditTask ? "Редактировать" : "Создать";
const { createTask, editTask } = useTasks();

const emit = defineEmits<{
  (e: "closerForm"): void;
}>();

const isNotFilledForm = () => {
  if (formData.value.name === "") {
    isNotFilledInput.value.name = true;
  }
  if (formData.value.desk === "") {
    isNotFilledInput.value.desk = true;
  }
  if (formData.value.desk === "" || formData.value.name === "") {
    return true;
  }
  return false;
};

const createdTask = () => {
  if (!isNotFilledForm()) {
    if (props.isEditTask) {
      editTask(  formData.value);
    } else {
      createTask(formData.value);
    }
    closerForm();
  }
};

const closerForm = () => {
  emit("closerForm");
};

// watch(tasks, () => {
//   console.log('ww')
//   localStorage.setItem("tasks", JSON.stringify(tasks.value));
// });
</script>

<style scoped lang="scss">
.form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.form__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  height: 370px;
  margin: -200px 0 0 -300px;
  background-color: white;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.form__overloy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
  z-index: 0;
}

.form__desc {
  margin-bottom: 10px;
}

.form__input {
  padding-left: 10px;
  border: 1px solid black;
  border-radius: 5px;
  min-height: 30px;
  width: 98%;
}

.form__name_filled {
  animation-name: shake;
  animation-duration: 0.5s;
  animation-iteration-count: 2;
}

.form__desk_filled {
  animation-name: shake;
  animation-duration: 0.5s;
  animation-iteration-count: 2;
}

@keyframes shake {
  0% {
    transform: translate(2px, 0px);
  }
  10% {
    transform: translate(-2px, 0px);
  }
  20% {
    transform: translate(2px, 0px);
  }
  30% {
    transform: translate(-2px, 0px);
  }
}

.form__selects_wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.form__select_wrapper {
  width: 100%;
}

.form__select {
  width: 100%;
  min-height: 25px;
  margin-bottom: 25px;
}

.form__btn--wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.form__btn {
  border-radius: 10px;
  height: 30px;
  width: 200px;
}

@media screen and (max-width: 770px) {
  .form__wrapper {
    width: 530px;
    margin: -210px 0 0 -285px;
  }
}

@media screen and (max-width: 620px) {
  .form__wrapper {
    width: 480px;
    margin: -215px 0 0 -260px;
  }
}

@media screen and (max-width: 550px) {
  .form {
    font-size: 12px;
  }

  .form__wrapper {
    width: 430px;
    margin: -215px 0 0 -235px;
  }
}

@media screen and (max-width: 480px) {
  .form__wrapper {
    width: 350px;
    margin: -250px 0 0 -197px;
  }
}

@media screen and (max-width: 400px) {
  .form__wrapper {
    width: 325px;
    margin: -250px 0 0 -185px;
  }
}

@media screen and (max-width: 361px) {
  .form__wrapper {
    width: 300px;
    margin: -200px 0 0 -170px;
  }
}
</style>
