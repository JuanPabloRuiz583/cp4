// AddTarget.tsx
import React, { useState } from 'react';
import { postTarget } from '../Api/APIService';
import { Target } from '../../types'; // Importe a interface
import './AddTarget.css'; // Importe o arquivo CSS

const AddTarget: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null); // Para capturar erros

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTarget: Target = {
      id: 0, // O ID será gerado pela API
      title,
      description,
      isComplete: false,
    };

    try {
      await postTarget(newTarget);
      setTitle(''); // Limpa o campo de título
      setDescription(''); // Limpa o campo de descrição
      setError(null); // Limpa erros anteriores, se houver
    } catch (error) {
      console.error('Erro ao adicionar target:', error);
      setError('Erro ao adicionar target. Tente novamente.'); // Define a mensagem de erro
    }
    location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="add-target-form">
      <h3>Adicionar Target</h3>
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
      <button type="submit">Adicionar Target</button>
      {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}
    </form>
  );
};

export default AddTarget;
