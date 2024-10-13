<template>
  <nav class="board__header">
    <div class="board__nav--wrapper">
      <p class="board__kanban--nav" @click="$router.push({ name: 'Kanban' })">
        Kanban board
      </p>
      <p class="board__weather--nav" @click="$router.push({ name: 'Weather' })">
        Weather
      </p>
    </div>
    <AppSearch />
  </nav>
</template>

<script setup lang="ts">
import AppSearch from "./AppSearch.vue";
</script>

<style scoped>
.board__header {
  min-height: 50px;
  padding: 0;
  background-color: blanchedalmond;

  display: flex;
  justify-content: space-between;
}

.board__nav--wrapper {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.board__kanban--nav {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.board__weather--nav {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
