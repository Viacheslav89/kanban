export interface Task {
    name: string;
    desk: string;
    deadline: string;
    type: string;
    user: string;
    status: string;
    id: number;
    isEdit: boolean;
  }
  
  export interface Column {
    name: string;
    id: number;
  }