import { ref } from "vue";
import { Column, ColumnId } from "../types";

const boardColumnsInit = [
  { name: "Сделать", id: ColumnId.New },
  { name: "В работе", id: ColumnId.inProgress },
  { name: "Выполнено", id: ColumnId.Done },
];

const boardColumns = ref<Array<Column>>(
  JSON.parse(
    localStorage.getItem("columns") || JSON.stringify(boardColumnsInit)
  )
);

export const useColumns = () => {
  const createColumn = (formData: Column) => {
    const newColumn = {
      name: formData.name,
      id: +(localStorage.getItem("columnId") || 3) + 1,
    };

    if (newColumn.name.length) {
      newColumn.name = `${formData.name[0].toUpperCase()}${formData.name.slice(
        1
      )}`;
    }

    boardColumns.value.push(newColumn);
    localStorage.setItem("columns", JSON.stringify(boardColumns.value));
    localStorage.setItem("columnId", JSON.stringify(newColumn.id));
  };

  const editColumn = (formData: Column) => {
    const idxEditColumn = boardColumns.value.findIndex(
      (column) => column.id === formData.id
    );

    const newColumn = {
      ...formData
    };

    if (newColumn.name.length) {
      newColumn.name = `${formData.name[0].toUpperCase()}${formData.name.slice(
        1
      )}`;
    }

    boardColumns.value.splice(idxEditColumn, 1, newColumn);
    localStorage.setItem("columns", JSON.stringify(boardColumns.value));
  };

  const deleteColumn = (columnId: number) => {
    boardColumns.value = boardColumns.value.filter(
      (column) => column.id !== columnId
    );
    localStorage.setItem("columns", JSON.stringify(boardColumns.value));
  };

  return {
    boardColumns,
    boardColumnsInit,
    createColumn,
    editColumn,
    deleteColumn,
  };
};
