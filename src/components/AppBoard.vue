<template>
  <div class="board">
    <h1 class="board__title">Kanban board</h1>
    <div class="board__btn_wrapper">
      <button class="board__btn btn" @click="toggleForm">Создать задачу</button>
      <button class="board__btn btn" @click="clearLocal">Очистить</button>
    </div>
    <AppColumns 
      @edited-task="editedTask"
    />

  </div>

  <AppForm
    v-if="isOpenForm"
    :isEditTask="isEditTask"
    :task="editableTask"
    @closer-form="cancelForm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Task } from "../types";
import { useTasks } from "../composables/useTasks";

import AppColumns from "./AppColumn.vue";
import AppForm from "./AppForm.vue";

const { tasks } = useTasks();

const isOpenForm = ref(false);
let isEditTask = false;
let editableTask: Task;


const clearLocal = (): void => {
  localStorage.clear();
  tasks.value = [];
};

const toggleForm = (): void => {
  isOpenForm.value = !isOpenForm.value;
};

const editedTask = (currentTask: Task) => {
  isEditTask = true;
  editableTask = currentTask;
  toggleForm();
};

const cancelForm = () => {
  toggleForm();
  isEditTask = false;
};
</script>

<style scoped lang="scss">
$color-border: rgb(78, 67, 67);

.board {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

.board__title {
  margin: 20px auto 10px auto;
  width: 250px;
  font-size: 38px;
  color: rgb(59, 51, 51);
  white-space: nowrap;
}

.board__btn_wrapper {
  margin: 0 auto;
  width: 510px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
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

.board__btn {
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 35px;
  width: 100%;
}

// .board__desk_wrapper {
//   margin: 0;
//   padding: 0 25px 0 25px;
//   display: flex;
//   justify-content: center;
// }

// .board__column {
//   width: 100%;
//   list-style: none;
//   background-color: bisque;
//   border: 2px solid $color-border;
// }

// .column__title {
//   padding: 10px;
//   margin: 0;
//   text-align: center;
//   border-bottom: 4px solid $color-border;
// }

// .board__desk {
//   padding: 15px;
//   min-height: 200px;
// }

// .board__task {
//   padding-left: 10px;
//   border-radius: 5px;
//   margin-bottom: 10px;

//   &_blue {
//     background-color: rgb(85, 108, 243);
//     list-style: none;
//   }

//   &_red {
//     background-color: rgb(236, 58, 58);
//     list-style: none;
//   }

//   &_completed &_title,
//   &_completed &_desk {
//     text-decoration: line-through;
//   }
// }

@media screen and (max-width: 770px) {
  .board__btn_wrapper {
    width: 400px;
  }

  .column__title {
    font-size: 18px;
  }
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

  .board__btn {
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 35px;
    width: 100%;
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
