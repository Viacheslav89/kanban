<template>
  <div class="board__task_wrapper">
    <h3 class="board__task_title">{{ task.name }}</h3>
    <p class="board__task_desk">{{ task.desk }}</p>
    <div class="board__task_deadline_wrapper">
      <p
        :class="{
          board__task_deadline: true,
          board__task_deadline_end:
            Date.parse(task.deadline) + 86400000 < new Date().getTime() &&
            column !== 'Выполнено',
        }"
      >
        {{ task.deadline }}
      </p>
      <b v-if="column === 'Выполнено'" class="board__task_ready"> Завершено </b>
    </div>
    <p class="board__task_user">{{ task.user }}</p>

    <select name="" id="" class="board__task_status" @input="changeStatus">
      <option value="К выполнению" :selected="task.status === 'К выполнению'">
        К выполнению
      </option>
      <option value="В работе" :selected="task.status === 'В работе'">
        В работе
      </option>
      <option value="Выполнено" :selected="task.status === 'Выполнено'">
        Выполнено
      </option>
    </select>
  </div>

  <div class="board__task_wrapper_btn">
    <button class="board__task_change btn" @click="editedTask(task)">..</button>
    <button class="board__task_delete btn" @click="removedTask(task)">Х</button>
  </div>
</template>

<script setup lang="ts">
import { Task } from "@/types";

const props = defineProps<{
  task: Task;
  column: string;
}>();

const emit = defineEmits<{
  (
    e: "edited",
    payload: {
      updatedTask: Task;
    }
  ): void;
  (e: "editedTask"): void;
  (e: "removedTask"): void;
}>();

const changeStatus = (e: Event) => {
//   const value = (e.target as unknown as { value: string }).value;
const value = (e.target as HTMLInputElement).value;

  //   console.log("changeStatus >>>", value);
  const updatedTask = {
    ...props.task,
    status: value,
  };

  emit("edited", {
    updatedTask,
  });
};

const editedTask = (task: Task): void => {
  emit("editedTask", task);
};

const removedTask = (task: Task): void => {
  emit("removedTask", task);
};
</script>
