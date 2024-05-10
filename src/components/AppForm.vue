<template>
  <h2 class="form__title">Форма</h2>
  <p class="form__desc">
    Название задачи: <br />
    <input
      v-model="task.name"
      class="form__input"
      type="text"
      placeholder="Покормить кота"
    />
  </p>
  <p class="form__desc">
    Описание: <br />
    <input
      v-model="task.desk"
      class="form__input"
      type="text"
      placeholder="Дать рыбку в обед"
    />
  </p>
  <p class="form__desc">
    Дедлайн: <br />
    <input
      v-model="task.deadline"
      class="form__input"
      type="date"
      max="2026-12-31"
    />
  </p>


        <select class="form__select" name="select" v-model="task.type">
          <option value="Задача">Задача</option>
          <option value="Баг">Баг</option>
        </select>

        <select class="form__select" name="select" v-model="task.user">
          <option value="Не назначен">Не назначен</option>
          <option value="Johnny Depp">Johnny Depp</option>
          <option value="Leonardo DiCaprio">Leonardo DiCaprio</option>
          <option value="Beb Affleck">Ben Affleck</option>
        </select>
</template>

<script setup lang="ts">
import { Task } from "@/types";

const props = defineProps<{
  task: Task;
}>();


</script>
