// App.tsx
import React from 'react';
import AddTarget from './Componentes/Targets/AddTarget';
import './App.css';
import TargetList from './Componentes/Targets/TargetList';
import AddTodo from './Componentes/Todos/AddTodo';

const App: React.FC = () => {
  const targetId = 0;

  return (
    <div className='container'>
      <div>
        <h1>TARGETS</h1>
        <AddTarget />
        <TargetList />
      </div>
      <div>
      <h1>TODOS</h1>
        <AddTodo  targetId ={targetId} />
      </div>
    </div>
  );
};

export default App;
