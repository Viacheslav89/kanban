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
    ToDo = "К выполнению",
    Doing = "В работе",
    Done = "Выполнено",
  }

  export enum ColumnId {
    ToDo = 1,
    Doing = 2,
    Done = 3,
  }