import React from 'react'
import { useFetch } from './hooks/useFetch.js'
import { CharCards } from './components/CharCards/CharCards.jsx';

const App = () => {
  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character/1', {});

  console.log("data 1 ",data);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let characters = [];

  if(data.name.length > 0){
    characters =   [data];
  }else if(data.results && data.results.length > 0){
    characters = data.results;
  }
  

  console.log("data 2 ",characters);
  return (
    <div>
      {characters.map(c => (
        <CharCards data={c}  />
      ))}
    </div>
  )
}
export { App }