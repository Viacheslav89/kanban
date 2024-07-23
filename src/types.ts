export interface Task {
    name: string;
    desk: string;
    deadline: string;
    type: string;
    user: string;
    status: string;
    id: number;
  }
  
  export interface Column {
    name: string;
    id: number;
  }

  export enum ColumnTitle {
    New = "К выполнению",
    inProgress = "В работе",
    Done = "Выполнено",
  }

  export enum ColumnId {
    New = 1,
    inProgress = 2,
    Done = 3,
  }