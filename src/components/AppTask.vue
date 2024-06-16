<template>
  <div class="task__header">
    <h3 class="task__title">{{ task.name }}</h3>
    <div class="task__wrapper_btn">
      <button class="task__btn_change btn" @click="editedTask">..</button>
      <button class="task__btn_delete btn" @click="removeTask(props.task)">Х</button>
    </div>
  </div>

  <p class="task__desk">{{ task.desk }}</p>

  <div class="task__deadline_wrapper">
    <p
      v-if="task.status !== ColumnTitle.Done"
      :class="{
        task__deadline: true,
        task__deadline_end: getDeadline(task.deadline, column),
      }"
    >
      {{ task.deadline }}
    </p>
    <b v-if="column === ColumnTitle.Done" class="task__ready"> Завершено </b>
  </div>

  <p class="task__user">{{ task.user }}</p>

  <select name="" id="" class="task__status" @input="editTaskStatus($event, props.task)">
    <option value="К выполнению" :selected="task.status === ColumnTitle.ToDo">
      К выполнению
    </option>
    <option value="В работе" :selected="task.status === ColumnTitle.Doing">
      В работе
    </option>
    <option value="Выполнено" :selected="task.status === ColumnTitle.Done">
      Выполнено
    </option>
  </select>
</template>

<script setup lang="ts">
import { Task } from "../types";
import { useChangeTasks } from "./composable"

enum ColumnTitle {
  ToDo = "К выполнению",
  Doing = "В работе",
  Done = "Выполнено",
};

const props = defineProps<{
  task: Task;
  column: string;
}>();

const getDeadline = (deadline: string, column: string) => {
  return (
    Date.parse(deadline) + 86400000 < new Date().getTime() &&
    column !== ColumnTitle.Done
  );
};

const emit = defineEmits<{
  (e: "editedTask", currentTask: Task): void;
}>();

const { editTaskStatus, removeTask } = useChangeTasks();

const editedTask = (): void => {
  emit("editedTask", props.task);
};
</script>


<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.board__task {
  list-style-type: none;
}

.task__header {
  display: flex;
  justify-content: space-between;
  padding: 8px 5px 0 0;
}

.task__title {
  margin: 0;
  word-break: break-all;
}

.task__desk {
  padding-right: 10px;
  word-break: break-all;
}

.task__wrapper_btn {
  display: flex;
  margin-left: 3px;
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

@media screen and (max-width: 570px) {
  .task__btn_delete {
    width: 23px;
    height: 23px;
    font-size: 9px;
    margin-left: 2px;
  }

  .task__btn_change {
    width: 23px;
    height: 23px;
    font-size: 9px;
  }

  .task__status {
    width: 110px;
    font-size: 12px;
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
  .task__header {
    padding: 3px;
  }

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
    width: 60px;
  }

  .task__ready {
    font-size: 12px;
  }
}
</style>
