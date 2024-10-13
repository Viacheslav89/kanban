<template>
  <div class="column__header">
    <h2 class="column__title">{{ column.name }}</h2>
    <div class="column__wrapper--btn">
      <button class="column__btn--edit btn" @click="editColumnTitle(column.id)">
        ..
      </button>
      <button class="column__btn--delete btn" @click="deleteColumn(column.id)">
        Х
      </button>
    </div>
  </div>

  <draggable
    :list="getTasksColumnStatus(column.name, searchTaskData)"
    tag="ul"
    class="column__desk"
    group="tasks"
    item-key="id"
    :animation="300"
    @drop="editTask(task, column.name)"
  >
    <template #item="{ element: task }">
      <transition-group tag="div" type="transition">
        <AppTask
          draggable="true"
          :key="task.id"
          :column="column.name"
          :task="task"
          @edited-task="editedTask(task)"
          @drop="dropTask(task)"
        >
        </AppTask>
      </transition-group>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { Task, Column } from "../types";
import { useTasks } from "../composables/useTasks";
import { useColumns } from "../composables/useColumns";
import AppTask from "./AppTask.vue";
import draggable from "vuedraggable";

defineProps<{
  column: Column;
  task: Task;
}>();

const { searchTaskData, editTask, getTasksColumnStatus } = useTasks();
const { deleteColumn } = useColumns();

const emit = defineEmits<{
  (e: "editedColumnTitle", columnId: number): void;
  (e: "editedTask", currentTask: Task): void;
  (e: "dropTask", column: Task): void;
}>();

const editColumnTitle = (columnId: number) => {
  emit("editedColumnTitle", columnId);
};

const editedTask = (currentTask: Task) => {
  emit("editedTask", currentTask);
};

const dropTask = (task: Task) => {
  emit("dropTask", task);
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.column__header {
  padding: 10px;
  border-bottom: 2px solid $color-border;
  display: flex;
  justify-content: space-between;
  height: 35px;
}

.column__wrapper--btn {
  display: flex;
}

.column__title {
  margin: 0;
  font-size: 20px;
  text-align: center;
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
  height: 23px;

  &:hover {
    transform: scale(1.03);
  }
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

  .column__btn--edit {
    width: 18px;
    height: 18px;
  }
}

@media screen and (max-width: 361px) {
  .column__title {
    font-size: 12px;
  }
}
</style>
