<template>
  <li v-for="column in boardColumns" class="column" :key="column.id">
    <h2 class="column__title">{{ column.name }}</h2>
    <ul class="column__desk">
      <AppTask
        v-for="taskItem in getTasksColumnStatus(column.name)"
        :key="taskItem.id"
        :column="column.name"
        :task="taskItem"
        @edited-task="editedTask(taskItem)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { Task, Column, ColumnId } from "../types";
import { useTasks } from "../composables/useTasks";

import AppTask from "./AppTask.vue";

const { tasks } = useTasks();

const emit = defineEmits<{
  (e: "editedTask", currentTask: Task): void;
}>();

const boardColumns: Column[] = [
  { name: "К выполнению", id: ColumnId.ToDo },
  { name: "В работе", id: ColumnId.Doing },
  { name: "Выполнено", id: ColumnId.Done },
];

const getTasksColumnStatus = (column: string): Task[] => {
  return tasks.value.filter((task) => task.status === column);
};

const editedTask = (currentTask: Task) => {
  emit("editedTask", currentTask);
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.column {
  width: 100%;
  list-style: none;
  background-color: bisque;
  border: 2px solid $color-border;

  &__title {
    margin: 0;
    font-size: 20px;
    padding: 10px;
    text-align: center;
    border-bottom: 4px solid $color-border;
  }

  &__desk {
    padding: 15px;
    min-height: 200px;
  }
}

@media screen and (max-width: 770px) {
  .column__title {
    font-size: 15px;
    padding: 10px 5px 10px 5px;
  }
}

@media screen and (max-width: 550px) {
  .column__desk {
    padding: 10px;
  }

  .column__title {
    font-size: 15px;
  }
}

@media screen and (max-width: 460px) {
  .column__title {
    font-size: 12px;
    padding: 10px 2px 10px 2px;

  }
}

@media screen and (max-width: 361px) {
  .column__title {
    font-size: 12px;
  }
}
</style>
