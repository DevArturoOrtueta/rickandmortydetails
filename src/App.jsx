import React, { useState } from 'react'
import { useFetch } from './hooks/useFetch.js'
import { CharCards } from './components/CharCards/CharCards.jsx';

const App = () => {
  const [inputChar, setInputChar] = useState('');
  const inputHandleChange = (e) => {
    setInputChar(e.target.value);
  }

  const query = inputChar.trim();
  const url = query === ''
    ? 'https://rickandmortyapi.com/api/character'
    : (/^\d+$/.test(query) ? `https://rickandmortyapi.com/api/character/${query}` : `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`);

  const { data, loading, error } = useFetch(url, {});

  let characters = [];

  if (data) {
    if (data.name) {
      characters = [data];
    } else if (Array.isArray(data.results)) {
      characters = data.results;
    } else if (Array.isArray(data)) {
      characters = data;
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder='Buscar personaje...'
        name='inputChar'
        id='inputChar'
        value={inputChar}
        onChange={inputHandleChange}
      />

      {/* Mostrar estado sin desmontar el input */}
      {loading && <div>Cargando...</div>}
      {error && <div>Error: {error.message}</div>}

      {
        query.length !== 0
          ? (characters.length > 0
              ? characters.map(c => (
                  <CharCards key={c.id} {...c} />
                ))
              : !loading && !error ? <div>No se encontraron personajes.</div> : null
            )
          : null
      }
    </div>
  )
}
export { App }