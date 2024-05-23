<template>
  <div class="task__header">
    <h3 class="task__title">{{ task.name }}</h3>
    <div class="task__wrapper_btn">
      <button class="task__btn_change btn" @click="editedTask">..</button>
      <button class="task__btn_delete btn" @click="removedTask">Х</button>
    </div>
  </div>

  <p class="board__task_desk">{{ task.desk }}</p>

  <div class="task__deadline_wrapper">
    <p
      v-if="task.status !== 'Выполнено'"
      :class="{
        task__deadline: true,
        task__deadline_end:
          Date.parse(task.deadline) + 86400000 < new Date().getTime() &&
          column !== 'Выполнено',
      }"
    >
      {{ task.deadline }}
    </p>
    <b v-if="column === 'Выполнено'" class="task__ready"> Завершено </b>
  </div>

  <p class="task__user">{{ task.user }}</p>

  <select name="" id="" class="task__status" @input="changeStatus">
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

  .task__header {
    display: flex;
    justify-content: space-between;
    padding: 8px 5px 0 0;
  }

  .task__title {
    margin: 0;
  }

  .task__wrapper_btn {
    display: flex;
  }

  .task__btn_delete {
    width: 25px;
    height: 25px;
    margin-left: 3px;
  }

  .task__btn_change {
    width: 25px;
    height: 25px;
  }

  .task__deadline_wrapper {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }

  .task__deadline {
    margin: 0;
    padding: 0;
  }

  .task__ready {
    margin: 0;
    color: rgb(137, 240, 96);
    font-size: 18px;
  }

  .task__deadline_end {
    background-color: rgb(128, 33, 33);
    padding: 5px;
    border-radius: 7px;
  }

  .task__status {
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


@media screen and (max-width: 565px) {

  .task__btn_delete {
    width: 20px;
    height: 20px;
    font-size: 9px;
    margin-left: 2px;
  }

  .task__btn_change {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }

  .task__status {
    width: 90px;
  }

  .task__ready {
    font-size: 15px;
  }
}

@media screen and (max-width: 490px) {
  .task__btn_delete {
    width: 18px;
    height: 18px;
    font-size: 8px;
    margin-left: 0;
  }

  .task__btn_change {
    width: 18px;
    height: 18px;
    font-size: 8px;
  }

  .task__status {
    font-size: 10px;
    width: 70px;
  }

  .task__ready {
    font-size: 12px;
  }
}

@media screen and (max-width: 400px) {
  .task__btn_delete {
    width: 18px;
    height: 18px;
    font-size: 8px;
    margin-left: 0;
  }

  .task__btn_change {
    width: 18px;
    height: 18px;
    font-size: 8px;
  }

  .task__status {
    width: 45px;
  }

  .task__ready {
    font-size: 12px;
  }
}
</style>
