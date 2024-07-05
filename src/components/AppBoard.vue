<template>
  <div class="board">
    <h1 class="board__title">Kanban board</h1>
    <div class="board__btn_wrapper">
      <button class="board__btn btn" @click="toggleForm">Создать задачу</button>
      <button class="board__btn btn" @click="clearLocal">Очистить</button>
    </div>
    <ul class="board__contents">
      <AppColumns @edited-task="editedTask" />
    </ul>
  </div>

  <AppForm
    v-if="isOpenForm"
    :is-edit-task="isEditTask"
    :task="editableTask"
    @closer-form="cancelForm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Task } from "../types";
import { useTasks } from "../composables/useTasks";

import AppColumns from "./AppColumn.vue";
import AppForm from "./AppForm.vue";

const { tasks } = useTasks();

const isOpenForm = ref(false);
let isEditTask = false;
let editableTask: Task;

const clearLocal = (): void => {
  localStorage.clear();
  tasks.value = [];
};

const toggleForm = (): void => {
  isOpenForm.value = !isOpenForm.value;
};

const editedTask = (currentTask: Task) => {
  isEditTask = true;
  editableTask = currentTask;
  toggleForm();
};

const cancelForm = () => {
  toggleForm();
  isEditTask = false;
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.board {
  border-collapse: collapse;
  margin: 0;
  padding: 0;

  &__title {
    margin: 20px auto 10px auto;
    width: 250px;
    font-size: 38px;
    color: rgb(59, 51, 51);
  }

  &__btn_wrapper {
    margin: 0 auto;
    width: 510px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  &__btn {
    margin: 10px 3px 10px 3px;
    border-radius: 10px;
    height: 35px;
    width: 100%;
  }
  
  &__contents {
    margin: 0;
    padding: 0 25px 0 25px;
    display: flex;
    justify-content: center;
  }
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

@media screen and (max-width: 770px) {
  .board__btn_wrapper {
    width: 400px;
  }
}

@media screen and (max-width: 550px) {
  .board__title {
    width: 205px;
    font-size: 32px;
  }

  .board__btn_wrapper {
    width: 320px;
  }
}

@media screen and (max-width: 361px) {
}
</style>
