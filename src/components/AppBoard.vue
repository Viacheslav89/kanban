<template>
  <div class="board">
    <h1 class="board__title">Kanban board</h1>
    <div class="board__btn--wrapper">
      <button class="board__btn btn" @click="toggleForm">Создать задачу</button>
      <button class="board__btn btn" @click="clearLocal">Очистить</button>
    </div>
    <ul class="board__contents">
      <li v-for="column in boardColumns" class="column" :key="column.id">
        <AppColumns @edited-task="editedTask" :column="column" />
      </li>
    </ul>
  </div>

  <AppForm v-if="isOpenForm" :task="editableTask" @close="cancelForm" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Task, Column, ColumnId } from "../types";
import { useTasks } from "../composables/useTasks";

import AppColumns from "./AppColumn.vue";
import AppForm from "./AppForm.vue";

const { tasks } = useTasks();

const isOpenForm = ref(false);
let editableTask = ref<Task | undefined>(undefined);

const boardColumns: Column[] = [
  { name: "К выполнению", id: ColumnId.New },
  { name: "В работе", id: ColumnId.inProgress },
  { name: "Выполнено", id: ColumnId.Done },
];

const clearLocal = () => {
  localStorage.clear();
  tasks.value = [];
};

const toggleForm = () => {
  isOpenForm.value = !isOpenForm.value;
};

const editedTask = (currentTask: Task) => {
  editableTask.value = currentTask;
  toggleForm();
};

const cancelForm = () => {
  toggleForm();
  editableTask.value = undefined;
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
    white-space: nowrap;
    color: rgb(59, 51, 51);
  }

  &__btn--wrapper {
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
    padding: 0;
    margin: 0 40px 0 40px;
    display: flex;
    justify-content: center;
    border: 1px solid $color-border;

  }
}

.column {
  width: 100%;
  list-style: none;
  background-color: bisque;
  border: 1px solid $color-border;
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
  .board__btn--wrapper {
    width: 400px;
  }
}

@media screen and (max-width: 550px) {
  .board__title {
    width: 205px;
    font-size: 32px;
  }

  .board__contents {
    margin: 0 20px 0 20px;
  }

  .board__btn--wrapper {
    width: 320px;
  }
}

@media screen and (max-width: 361px) {
}
</style>
