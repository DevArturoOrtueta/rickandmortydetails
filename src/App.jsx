import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar.jsx'
import { Characters } from './pages/characters/Characters.jsx';
import { Episodes } from './pages/episodes/Episodes.jsx';
import { Locations } from './pages/locations/Locations.jsx';

const App = () => {
  const location = useLocation();
  
  const getActivePage = () => {
    if (location.pathname === '/episodes') return 'Episodes';
    if (location.pathname === '/locations') return 'Locations';
    return 'Characters';
  };

  return (
    <div>
      <Navbar activePage={getActivePage()} />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  )
}
export { App }