// TodoList.tsx
//import React, { useEffect, useState } from 'react';
//import { getTodosByTarget } from './APIService';
//import { Todo } from './types'; // Importe a interface

// TodoList.tsx
import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo } from '../Api/APIService'; // Importe as funções necessárias
import { Todo } from '../../types'; // Importe a interface

const TodoList: React.FC<{ targetId: number }> = ({ targetId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null); // Para capturar erros

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos(targetId);
        setTodos(response.data); // Armazena os todos recebidos
      } catch (error) {
        console.error('Erro ao buscar todos:', error);
        setError('Erro ao buscar todos. Tente novamente.'); // Mensagem de erro
      }
    };

    fetchTodos(); // Chama a função para buscar os todos
  }, [targetId]); // Dependência para atualizar quando targetId mudar

  const handleDelete = async (todoId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este todo?")) {
      try {
        await deleteTodo(todoId); // Chama a função para excluir o todo
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId)); // Atualiza o estado
      } catch (error) {
        console.error('Erro ao excluir todo:', error);
        setError('Erro ao excluir todo. Tente novamente.'); // Mensagem de erro
      }
    }
  };

  return (
    <div>
      <h3>Todos for Target {targetId}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
      <ul>
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>Nenhum todo disponível.</li> // Mensagem se não houver todos
        )}
      </ul>
    </div>
  );
};

export default TodoList;
