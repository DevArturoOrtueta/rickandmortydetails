import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { CharCards } from '../../components/CharCards/CharCards.jsx';
import './Locations.css'
import { EpiCards } from '../../components/EpiCards/EpiCards.jsx';
export const Locations = () => {

  const [inputEpi, setInputEpi] = useState('');
  const inputHandleChange = (e) => {
    setInputEpi(e.target.value);
  }

  const query = inputEpi.trim();
  const url = query === ''
    ? 'https://rickandmortyapi.com/api/episode'
    : (/^\d+$/.test(query) ? `https://rickandmortyapi.com/api/episode/${query}` : `https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(query)}`);

  const { data, loading, error } = useFetch(url, {});

  let episodes = [];

  if (data) {
    if (data.name) {
      episodes = [data];
    } else if (Array.isArray(data.results)) {
      episodes = data.results;
    } else if (Array.isArray(data)) {
      episodes = data;
    }
  }
  
  console.log("episodes: ",episodes);
  return (
   <div className='epimain-section'>
         <input
           type="text"
           placeholder='Buscar localizaciones...'
           name='inputEpi'
           id='inputEpi'
           value={inputEpi}
           onChange={inputHandleChange}
         />
   
         {/* Mostrar estado sin desmontar el input */}
         {loading && <div>Cargando...</div>}
         {error && <div>Error: {error.message}</div>}
   
       <div className='epicard-section'>
    {
           query.length !== 0
             ? (episodes.length > 0
                 ? episodes.map(c => (
                     <EpiCards key={c.id} {...c} />
                   ))
                 : !loading && !error ? <div>No se encontraron episodios.</div> : null
               )
             : null
         }
       </div>
        
       </div>
  )
}
