<template>
  <div class="board">
    <div class="board__header">
      <div>
        <h1 class="board__title">Kanban board</h1>
        <div class="board__btn--wrapper">
          <button class="board__btn btn" @click="toggleForm">
            Создать задачу
          </button>
          <button class="board__btn btn" @click="toggleFormColumn">
            Добавить колонку
          </button>
          <button class="board__btn btn" @click="clearLocal">Очистить</button>
        </div>
      </div>
    </div>
    <ul class="board__contents">
      <li v-for="column in boardColumns" class="column" :key="column.id">
        <AppColumns
          @edited-column-title="editedColumn(column)"
          @edited-task="editedTask"
          :column="column"
          @drop-task="setTask"
          :task="taskDrop"
          :search-task-data="searchTaskCopy"
        />
      </li>
    </ul>
    <div class="board__inputs--wrapper">
      <AppFilter @search-task="writeDownSearch"/>
      <AppWeather />
    </div>
  </div>

  <AppForm v-if="isOpenForm" :task="editableTask" @close="cancelForm" />
  <AppFormColumn
    v-if="isOpenFormColumn"
    :editable-column="editableColumn"
    @closeFormColumn="cancelFormColumn"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Task, Column } from "../types";
import { useTasks } from "../composables/useTasks";
import { useColumns } from "../composables/useColumns";

import AppColumns from "./AppColumn.vue";
import AppForm from "./AppForm.vue";
import AppFormColumn from "./AppFormColumn.vue";
import AppWeather from "./AppWeather.vue";
import AppFilter from "./AppSearch.vue";

const { tasks } = useTasks();
const { boardColumns, boardColumnsInit } = useColumns();

const isOpenForm = ref(false);
const isOpenFormColumn = ref(false);

const editableTask = ref<Task | undefined>(undefined);
const editableColumn = ref<Column | undefined>(undefined);
const searchTaskCopy = ref('');

//костыль поправлю
const taskDrop = ref<Task>({
  name: "string",
  desk: "string",
  deadline: "string",
  type: "strng",
  user: "string",
  status: "string",
  id: 888,
});

const clearLocal = () => {
  localStorage.clear();
  tasks.value = [];
  boardColumns.value = boardColumnsInit;
};

const writeDownSearch = (searchTaskData: string) => {
  searchTaskCopy.value = searchTaskData;
}

const toggleForm = () => {
  isOpenForm.value = !isOpenForm.value;
};

const toggleFormColumn = () => {
  isOpenFormColumn.value = !isOpenFormColumn.value;
};

const editedColumn = (currentColumn: Column) => {
  toggleFormColumn();
  editableColumn.value = currentColumn;
};

const editedTask = (currentTask: Task) => {
  editableTask.value = currentTask;
  toggleForm();
};

const cancelForm = () => {
  toggleForm();
  editableTask.value = undefined;
};

const cancelFormColumn = () => {
  toggleFormColumn();
  editableColumn.value = undefined;
};

const setTask = (task: Task) => {
  taskDrop.value = task;
};
</script>

<style scoped lang="scss">
$color-border: rgb(48, 21, 21);

.board__header {
  display: flex;
  justify-content: space-around;
}

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

.board__inputs--wrapper {
  display: flex;
  justify-content: space-between;
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
