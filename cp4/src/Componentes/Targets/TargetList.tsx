import React, { useEffect, useState } from 'react';
import { deleteTarget, getTargets } from '../Api/APIService';
import { Target } from '../../types';
import EditTarget from '../Targets/EditTarget';
import './TargetList.css'; // Importando o novo CSS

const TargetList: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [editingTarget, setEditingTarget] = useState<Target | null>(null);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const response = await getTargets();
        setTargets(response.data);
      } catch (error) {
        console.error('Erro ao buscar targets:', error);
      }
    };
    fetchTargets();
  }, []);

  const handleDelete = async (targetId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este target?")) {
      try {
        await deleteTarget(targetId);
        setTargets(prevTargets => prevTargets.filter(target => target.id !== targetId));
      } catch (error) {
        console.error('Erro ao excluir target:', error);
      }
    }
  };

  const handleEdit = (target: Target) => {
    setEditingTarget(target);
  };

  const closeEditForm = () => {
    setEditingTarget(null);
  };

  return (
    <div className="target-list-container">
      <h2 className="target-list-title">Lista de Targets</h2>
      <ul className="target-list">
        {targets.map(target => (
          <li key={target.id} className="target-item">
            <span className="target-title">{target.title}</span>
            <div className="target-actions">
              <button className="btn edit" onClick={() => handleEdit(target)}>Editar</button>
              <button className="btn delete" onClick={() => handleDelete(target.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      {editingTarget && (
        <EditTarget target={editingTarget} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default TargetList;
