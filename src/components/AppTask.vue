<template>
  <li
    class="task"
    :class="{
      task__type_work: isTask(task),
      task__type_bag: isBug(task),
    }"
  >
    <div class="task__header">
      <h3 class="task__title">{{ task.name }}</h3>
      <div class="task__wrapper--btn">
        <button class="task__btn--change btn" @click="editedTask(task)">
          ..
        </button>
        <button class="task__btn--delete btn" @click="deleteTask(task.id)">
          Х
        </button>
      </div>
    </div>

    <p class="task__desk">{{ task.desk }}</p>

    <div class="task__deadline_wrapper">
      <p
        v-if="!isStatusColumn(task.status, ColumnTitle.Done)"
        class="task__deadline"
        :class="{
          task__deadline_end: getDeadline(task.deadline, column),
        }"
      >
        {{ task.deadline }}
      </p>
      <b v-if="isStatusColumn(column, ColumnTitle.Done)" class="task__ready">
        Завершено
      </b>
    </div>

    <p class="task__user">{{ task.user }}</p>

    <select v-model="task.status" class="task__status" @change="editTask(task, task.status)">
      <option v-for="column in boardColumns" 
        :key="column.id"
        :value=column.name
      > 
        {{ column.name }}
      </option>

    </select>
  </li>
</template>

<script setup lang="ts">
import { Task, ColumnTitle } from "../types";
import { useTasks } from "../composables/useTasks";
import { useColumns } from "../composables/useColumns";



defineProps<{
  task: Task;
  column: string;
}>();

enum TaskType {
  Task = "Задача",
  Bug = "Баг",
}

const isStatusColumn = (statusTask: string, columnTitle: string) => {
  return statusTask === columnTitle;
};

const isBug = (task: Task) => {
  return task.type === TaskType.Bug;
};

const isTask = (task: Task) => {
  return task.type === TaskType.Task;
};

const getDeadline = (deadline: string, column: string) => {
  return (
    Date.parse(deadline) + 86400000 < new Date().getTime() &&
    column !== ColumnTitle.Done
  );
};

const emit = defineEmits<{
  (e: "editedTask", currentTask: Task): void;
}>();

const { editTask, deleteTask } = useTasks();
const { boardColumns } = useColumns();


const editedTask = (currentTask: Task): void => {
  emit("editedTask", currentTask);
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.column__desk {
  padding: 15px;
  min-height: 200px;
}

.task {
  padding-left: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  list-style: none;
  user-select: none;

  &__type_work {
    background-color: rgb(85, 108, 243);
  }

  &__type_bag {
    background-color: rgb(236, 58, 58);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 8px 5px 0 0;
  }

  &__title {
    margin: 0;
    word-break: break-all;
  }

  &__desk {
    padding-right: 10px;
    word-break: break-all;
  }

  &__wrapper--btn {
    display: flex;
    margin-left: 3px;
  }

  &__btn--delete {
    width: 25px;
    height: 25px;
    margin-left: 3px;
  }

  &__btn--change {
    width: 25px;
    height: 25px;
  }

  &__deadline--wrapper {
    margin: 0;
    display: flex;
    justify-content: space-between;
  }

  &__deadline {
    margin: 0;
    padding: 5px 0 5px 0;
  }

  &__ready {
    margin: 0;
    color: rgb(137, 240, 96);
    font-size: 18px;
    padding: 5px 0 5px 0;
  }

  &__deadline--end {
    background-color: rgb(128, 33, 33);
    padding: 5px;
    border-radius: 7px;
  }

  &__status {
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

@media screen and (max-width: 570px) {
  .task {
    font-size: 12px;
    padding-left: 8px;

    &__btn--delete {
      width: 23px;
      height: 23px;
      font-size: 9px;
      margin-left: 2px;
    }

    &__btn--change {
      width: 23px;
      height: 23px;
      font-size: 9px;
    }

    &__status {
      width: 100px;
      font-size: 11px;
    }

    &__ready {
      font-size: 15px;
    }
  }
}

@media screen and (max-width: 490px) {
  .task {
    font-size: 12px;

    &__btn--delete {
      width: 20px;
      height: 20px;
      font-size: 8px;
      margin-left: 0;
    }

    &__btn--change {
      width: 20px;
      height: 20px;
      font-size: 8px;
    }

    &__status {
      font-size: 9px;
      width: 75px;
    }

    &__ready {
      font-size: 11px;
    }
  }
}

@media screen and (max-width: 400px) {
  .task {
    font-size: 11px;
    padding-left: 5px;

    &__btn--delete {
      width: 18px;
      height: 18px;
    }

    &__btn--change {
      width: 18px;
      height: 18px;
      font-size: 8px;
    }

    &__header {
      padding: 3px;
    }

    &__btn--delete {
      font-size: 7px;
      margin-left: 0;
    }

    &__btn--change {
      font-size: 8px;
    }

    &__status {
      width: 60px;
      font-size: 8px;
    }

    &__ready {
      font-size: 10px;
    }
  }
}

@media screen and (max-width: 400px) {
  .task {
    font-size: 9px;
  }
}
</style>
