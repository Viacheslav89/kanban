<template>
  <ul class="board__desk_wrapper">
    <li v-for="column in boardColumns" class="board__column">
      <h2 class="column__title">{{ column }}</h2>
      <ul class="board__desk">
        <AppTask
          v-for="taskItem in getTasksColumnStatus(column)"
          :key="taskItem.id"
          :column="column"
          :task="taskItem"
          @editedTask="editedTask(taskItem)"
        />
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { Task } from "../types";
import { useTasks } from "../composables/useTasks";

import AppTask from "./AppTask.vue";

const { tasks } = useTasks();

const emit = defineEmits<{
  (e: "editedTask", currentTask: Task): void;
}>();

const boardColumns = ["К выполнению", "В работе", "Выполнено"];

const getTasksColumnStatus = (column: string): Task[] => {
  return tasks.value.filter((task) => task.status === column);
};

const editedTask = (currentTask: Task) => {
  emit("editedTask", currentTask);
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.board__desk_wrapper {
  margin: 0;
  padding: 0 25px 0 25px;
  display: flex;
  justify-content: center;
}

.board__column {
  width: 100%;
  list-style: none;
  background-color: bisque;
  border: 2px solid $color-border;
}

.column__title {
  padding: 10px;
  margin: 0;
  text-align: center;
  border-bottom: 4px solid $color-border;
}

.board__desk {
  padding: 15px;
  min-height: 200px;
}

@media screen and (max-width: 770px) {
}

@media screen and (max-width: 550px) {
  .board__desk {
    padding: 10px;
    min-height: 200px;
  }

  .board__task {
    padding-left: 5px;
    font-size: 12px;
  }

  .column__title {
    font-size: 13px;
    white-space: nowrap;
  }

  .board__title {
    width: 205px;
    font-size: 32px;
  }

  .board__btn_wrapper {
    width: 320px;
  }
}

@media screen and (max-width: 361px) {
  .board__task {
    padding-left: 5px;
    font-size: 10px;
  }
}
</style>
