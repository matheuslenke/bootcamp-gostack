import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function getData() {
    const response = await api.get('/repositories');

    setRepositories(response.data);
  }

  useEffect(() => {
    getData();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Título',
      url: 'https://localhost:3000',
      techs: ['nodeJS', 'ReactJS'],
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
