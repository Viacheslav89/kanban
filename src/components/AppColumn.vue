<template>
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
</template>

<script setup lang="ts">
import { Task, Column } from "../types";
import { useTasks } from "../composables/useTasks";
import AppTask from "./AppTask.vue";

defineProps<{
  column: Column;
}>();

const { tasks } = useTasks();

const emit = defineEmits<{
  (e: "editedTask", currentTask: Task): void;
}>();

const getTasksColumnStatus = (column: string): Task[] => {
  return tasks.value.filter((task) => task.status === column);
};

const editedTask = (currentTask: Task) => {
  emit("editedTask", currentTask);
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.column__title {
  margin: 0;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  border-bottom: 4px solid $color-border;
}

.column__desk {
  padding: 15px;
  min-height: 200px;
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
