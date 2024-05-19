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
    <button class="board__task_change btn" @click="editedTask">..</button>
    <button class="board__task_delete btn" @click="removedTask">Х</button>
  </div>
</template>

<script setup lang="ts">
import { Task } from "../types";

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
  const value = (e.target as HTMLInputElement).value;

  const updatedTask = {
    ...props.task,
    status: value,
  };

  emit("edited", {
    updatedTask,
  });
};

const editedTask = (): void => {
  emit("editedTask");
};

const removedTask = (): void => {
  emit("removedTask");
};
</script>

<style lang="scss">
.board__task {
  &_wrapper {
    padding-left: 10px;
  }

  &_wrapper_btn {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    height: 30px;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  &_delete {
    width: 25px;
    height: 25px;
    margin-left: 3px;
  }

  &_change {
    width: 25px;
    height: 25px;
  }

  &_deadline_wrapper {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }

  &_deadline {
    margin: 0;
    padding: 0;
  }

  &_ready {
    margin: 0;
    margin-left: 15px;
    padding: 0;
    color: rgb(137, 240, 96);
    font-size: 18px;
  }

  &_deadline_end {
    background-color: rgb(128, 33, 33);
    padding: 5px;
    border-radius: 7px;
  }

  &_status {
    margin-bottom: 8px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2px;
    width: auto;
    background: linear-gradient(
      90deg,
      rgb(241, 244, 248) 30%,
      rgb(149, 159, 167) 100%
    );
    
  }
}

@media screen and (max-width: 565px) {
  .board__task {
    font-size: 12px;


    &_delete {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }

  &_change {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }

  &_status {
    width: 100px;
  }
  }
}

@media screen and (max-width: 420px) {
  .board__task {
    font-size: 12px;


    &_delete {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }

  &_change {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }

  &_status {
    width: auto;
  }
  }
}
</style>
