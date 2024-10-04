// EditTarget.tsx
import React, { useEffect, useState } from 'react';
import { putTarget } from '../Api/APIService';
import { Target } from '../../types';

const EditTarget: React.FC<{ target: Target; onClose: () => void }> = ({ target, onClose }) => {
  const [title, setTitle] = useState(target.title);
  const [description, setDescription] = useState(target.description);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTarget: Target = {
      ...target,
      title,
      description,
    };

    try {
      await putTarget(target.id, updatedTarget);
      onClose(); // Fecha o formulário após a atualização
    } catch (error) {
      console.error('Erro ao editar target:', error);
      setError('Erro ao editar target. Tente novamente.');
    }
  };

  useEffect(() => {
    setTitle(target.title);
    setDescription(target.description);
  }, [target]);

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
      <button type="submit">Update Target</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditTarget;
