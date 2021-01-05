import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {

  //estado
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
  
    const response = await api.post('/repositories', {
        title: 'Umbrel',
        url: 'https://github.com/rocketseat/umbriel',
        techs: ['Node.js', 'ReactJS']
      });

      setRepositories([...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);
      
    setRepositories(repositories.filter(
      repository => repository.id !== id
    )) 
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
