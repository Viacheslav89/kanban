<template>
  <div class="filter__wrapper">
    <input
      type="search"
      class="filter__input"
      placeholder="Search"
      v-model="searchTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTasks } from "../composables/useTasks";

const { searchTaskData } = useTasks();
const searchTask = ref('');

const changeSearchTask = () => {
  searchTaskData.value = searchTask.value;
};

const debounce = (fn: any, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function () {
    const fnCall = () => {
      fn.apply(fn);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

const changeSearchTaskDebounce = debounce(changeSearchTask, 800);

watch(searchTask, (data, prevData) => {
  if (data !== prevData) {
    changeSearchTaskDebounce();
  }
});
</script>

<style scoped lang="scss">
.filter__wrapper {
  max-width: 350px;
  padding: 20px;
}

.filter__input {
  font-size: 20px;
  width: 100%;
  border-radius: 8px;
  padding-left: 8px;
  color: grey;
}
</style>
