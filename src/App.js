import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    //setRepositories([...repositories, `Novo repositorio ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'www.teste.com.br',
      techs: 'NodeJs',
      likes: 0,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        <ul>
          <li>
            <ul>
              {repositories.map((repository) => (
                <li key={repository.id}>
                  {repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
