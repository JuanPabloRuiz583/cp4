// AddTodo.tsx
import React, { useState } from 'react';
import { postTodo } from '../Api/APIService';
import { Todo } from '../../types'; // Importe a interface

const AddTodo: React.FC<{ targetId: number }> = ({ targetId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: 0, // O ID será gerado pela API
      title,
      description,
      isComplete: false,
      targetId,
    };

    try {
      await postTodo(newTodo);
      setTitle('');
      setDescription('');
      setError(null);
    } catch (error) {
      console.error('Erro ao adicionar todo:', error);
      setError('Erro ao adicionar todo. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-target-form">
    <h3>Adicionar Todo</h3>
    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      placeholder="Título"
      required
    />
    <textarea
      value={description}
      onChange={e => setDescription(e.target.value)}
      placeholder="Descrição"
      required
    />
    <button type="submit">Adicionar Todo</button>
    {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}
  </form>
  );
};

export default AddTodo;
