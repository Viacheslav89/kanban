<template>
  <div class="form">
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
        <button class="form__btn btn" @click="createdTask">Создать</button>
        <button class="form__btn btn" @click="closerForm">Отменить</button>
      </div>
    </div>
    <div class="form__overloy"></div>
  </div>
</template>




<script setup lang="ts">
import { Task } from "../types";

defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "createdTask"): void;
  (e: "closerForm"): void;
}>();

const createdTask = () => {
  emit("createdTask");
};

const closerForm = () => {
  emit("closerForm");
};
</script>





<style lang="scss">
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
  height: 360px;
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

.form__select--wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
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
  .form__wrapper {
    width: 430px;
    margin: -215px 0 0 -235px;
  }
}
</style>
