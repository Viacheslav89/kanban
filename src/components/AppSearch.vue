<template>
  <div class="filter__wrapper">
    <h3 class="filter__title">Search</h3>
    <input type="search" class="filter__input" v-model="searchTask"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const searchTask = ref('');

const emit = defineEmits<{
  (e: "searchTask", searchTask: string): void;
}>();


const sentEmitSearchTask = () => {
  emit("searchTask", searchTask.value);
};


const debounce = (fn: any, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>;
    
    return function () {
      const fnCall = () => { fn.apply(fn) };
      clearTimeout(timeout)
      timeout = setTimeout(fnCall, ms)
    }
  };
  
const sentEmitSearchTaskDebounce = debounce(sentEmitSearchTask, 800);


watch(searchTask, (data, prevData) => {
  if (data !== prevData) {
    sentEmitSearchTaskDebounce();
  }
});

</script>

<style scoped lang="scss">
.filter__wrapper {
  max-width: 350px;
  padding: 0 20px 20px 45px;
}

.filter__title {
  margin: 0;
  margin: 40px 0 5px 0;
  font-size: 30px;
}

.filter__input {
  font-size: 20px;
  width: 100%;
  border-radius: 8px;
  padding-left: 8px;
  color: grey;
}
</style>
