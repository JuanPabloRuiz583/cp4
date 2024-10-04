// api.ts
import axios from 'axios';
import { Todo, Target } from '../../types';
const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
const requestBase = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const getTargets = async () => {
  return await requestBase.get('Targets');
};

export const getTodosByTarget = async (targetId: number) => {
  return await requestBase.get(`Todo?targetId=${targetId}`);
};

export const postTarget = async (target: Target) => {
    return await requestBase.post('Targets', target);
  };
  
  export const postTodo = async (todo: Todo) => {
    return await requestBase.post('Todo', todo);
  };

export const putTarget = async (targetId: number, target: any) => {
  return await requestBase.put(`Targets/${targetId}`, target);
};

export const putTodo = async (todoId: number, todo: any) => {
  return await requestBase.put(`Todo/${todoId}`, todo);
};

export const deleteTarget = async (targetId: number) => {
  return await requestBase.delete(`Targets/${targetId}`);
};




// Função para excluir um todo
export const deleteTodo = async (todoId: number) => {
    await requestBase.delete(`Todo/${todoId}`);
  };
  
  // Função para buscar todos os todos de um target
  export const getTodos = async (targetId: number) => {
    const response = await requestBase.get(`Todo?targetId=${targetId}`);
    return response.data; // Retorna os dados
  };
