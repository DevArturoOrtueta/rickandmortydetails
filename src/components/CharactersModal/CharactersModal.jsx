import { useState, useEffect } from 'react';
import './CharactersModal.css';

export const CharactersModal = ({ episodeName, characters, onClose }) => {
    const [charactersData, setCharactersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                console.log('Characters URLs:', characters);
                const promises = characters.map(url =>
                    fetch(url)
                        .then(res => {
                            if (!res.ok) throw new Error(`HTTP ${res.status}`);
                            return res.json();
                        })
                );
                const data = await Promise.all(promises);
                console.log('Characters data:', data);
                setCharactersData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching characters:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (characters && characters.length > 0) {
            fetchCharacters();
        } else {
            setLoading(false);
        }
    }, [characters]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2>Personajes - {episodeName}</h2>
                    <button className='modal-close' onClick={onClose}>✕</button>
                </div>

                <div className='modal-body'>
                    {loading ? (
                        <p>Cargando personajes...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : charactersData.length > 0 ? (
                        <div className='characters-grid'>
                            {charactersData.map(character => (
                                <div key={character.id} className='character-item'>
                                    <img src={character.image} alt={character.name} />
                                    <h4>{character.name}</h4>
                                    <p><strong>Status:</strong> {character.status}</p>
                                    <p><strong>Species:</strong> {character.species}</p>
                                    <p><strong>Gender:</strong> {character.gender}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay personajes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
