import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch.js'
import { CharCards } from '../../components/CharCards/CharCards.jsx';
import './Locations.css'
import { LocaCards } from '../../components/LocaCards/LocaCards.jsx';
export const Locations = () => {

  const [inputLoca, setInputLoca] = useState('');
  const inputHandleChange = (e) => {
    setInputLoca(e.target.value);
  }

  const query = inputLoca.trim();
  const url = query === ''
    ? 'https://rickandmortyapi.com/api/location/'
    : (/^\d+$/.test(query) ? `https://rickandmortyapi.com/api/location/${query}` : `https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(query)}`);

  const { data, loading, error } = useFetch(url, {});

  let locations = [];

  if (data) {
    if (data.name) {
    locations = [data];
    } else if (Array.isArray(data.results)) {
      locations = data.results;
    } else if (Array.isArray(data)) {
      locations = data;
    }
  }
  

  return (
   <div className='locamain-section'>
         <input
           type="text"
           placeholder='Buscar localizaciones...'
           name='inputLoca'
           id='inputLoca'
           value={inputLoca}
           onChange={inputHandleChange}
         />
   
         {/* Mostrar estado sin desmontar el input */}
         {loading && <div>Cargando...</div>}
         {error && <div>Error: {error.message}</div>}
   
       <div className='locacard-section'>
    {
           query.length !== 0
             ? (locations.length > 0
                 ? locations.map(c => (
                     <LocaCards key={c.id} {...c} />
                   ))
                 : !loading && !error ? <div>No se encontraron localizaciones.</div> : null
               )
             : null
         }
       </div>
        
       </div>
  )
}
