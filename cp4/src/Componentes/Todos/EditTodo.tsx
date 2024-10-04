// EditTodo.tsx
import React, { useEffect, useState } from 'react';
import { putTodo } from '../Api/APIService';
import { Todo } from '../../types';

const EditTodo: React.FC<{ todo: Todo; onClose: () => void }> = ({ todo, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodo: Todo = {
      ...todo,
      title,
      description,
    };

    try {
      await putTodo(todo.id, updatedTodo);
      onClose(); // Fecha o formulário após a atualização
    } catch (error) {
      console.error('Erro ao editar todo:', error);
      setError('Erro ao editar todo. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Update Todo</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EditTodo;
