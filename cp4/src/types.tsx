// types.ts
export interface Todo {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    targetId: number;
  }
  
  export interface Target {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
  }
  
  