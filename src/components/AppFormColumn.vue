<template>
  <div class="form">
    <div class="form__wrapper">


      <h2 class="form__title">Название колонки</h2>

      <p class="form__desc">

        <input
          class="form__input"
          v-model="formData.name"
          type="text"
          :class="{
            'form__desk--filled': isNotFilledInput,
          }"
        />
      </p>

      <div class="form__btn--wrapper">
        <button class="form__btn btn" @click="takeColumn">
          {{ editCreateTitle }}
        </button>
        <button class="form__btn btn" @click="onClose">Отменить</button>
      </div>

    </div>
    <div class="form__overlay"></div>
  </div>
</template>




<script setup lang="ts">
import { Column } from "../types";
import { useColumns } from "../composables/useColumns";
import { ref, watch } from "vue";


const props = defineProps<{
  editableColumn?: Column;
}>();

const editCreateTitle = props.editableColumn ? "Редактировать" : "Создать";

const isNotFilledInput = ref(false);


const { createColumn, editColumn } = useColumns();


const initFormColumnData = (): Column => {
  return {
    name: "",
    id: +(localStorage.getItem("taskId") || 4),
  };
};

const formData = ref({ ...initFormColumnData() });


watch(
  () => props.editableColumn,
  (oldColumn: Column | undefined) => {
    if (oldColumn) {
      formData.value = { ...oldColumn };
    }
  },
  
  { immediate: true }
);

const emit = defineEmits<{
  (e: "closeFormColumn"): void;
}>();

const onClose = () => {
  emit("closeFormColumn");
};

const isNotFilledForm = () => {
  if (!formData.value.name) {
    isNotFilledInput.value = true;
    return true;
  }
  return false;
};


const takeColumn = () => {
  if (!isNotFilledForm()) {
    if (props.editableColumn) {
      editColumn(formData.value);
    } else {
      createColumn(formData.value);
    }
    onClose();
  }
};

</script>



<style scoped lang="scss">
.form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    width: 600px;
    height: 200px;
    margin: -200px 0 0 -300px;
    background-color: white;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
    z-index: 2;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    z-index: 0;
  }

  &__desc {
    margin-bottom: 10px;
  }

  &__input {
    padding-left: 10px;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 40px;
    width: 98%;
    margin-bottom: 45px;
    font-size: 18px;
  }

  &__name--filled {
    animation-name: shake;
    animation-duration: 0.5s;
    animation-iteration-count: 2;
  }

  &__desk--filled {
    animation-name: shake;
    animation-duration: 0.5s;
    animation-iteration-count: 2;
  }

  &__selects--wrapper {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__select--wrapper {
    width: 100%;
  }

  &__select {
    width: 100%;
    border-radius: 5px;
    min-height: 25px;
  }

  &__btn--wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__btn {
    border-radius: 10px;
    height: 30px;
    width: 200px;
  }
}

@keyframes shake {
  0% {
    transform: translate(2px, 0px);
  }
  10% {
    transform: translate(-2px, 0px);
  }
  20% {
    transform: translate(2px, 0px);
  }
  30% {
    transform: translate(-2px, 0px);
  }
}

@media screen and (max-width: 770px) {
  .form__wrapper {
    width: 530px;
    margin: -210px 0 0 -285px;
  }
}

@media screen and (max-width: 620px) {
  .form__wrapper {
    width: 480px;
    margin: -215px 0 0 -260px;
  }
}

@media screen and (max-width: 550px) {
  .form {
    font-size: 12px;
  }

  .form__wrapper {
    width: 430px;
    margin: -215px 0 0 -235px;
  }
}

@media screen and (max-width: 480px) {
  .form__wrapper {
    width: 350px;
    margin: -250px 0 0 -197px;
  }
}

@media screen and (max-width: 400px) {
  .form__wrapper {
    width: 325px;
    margin: -250px 0 0 -185px;
  }
}

@media screen and (max-width: 361px) {
  .form__wrapper {
    width: 300px;
    margin: -200px 0 0 -170px;
  }
}
</style>
