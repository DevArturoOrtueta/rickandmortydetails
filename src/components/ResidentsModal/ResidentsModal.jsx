import { useState, useEffect } from 'react';
import './ResidentsModal.css';

export const ResidentsModal = ({ locationName, residents, onClose }) => {
    const [residentsData, setResidentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                
                const promises = residents.map(url => 
                    fetch(url)
                        .then(res => {
                            if (!res.ok) throw new Error(`HTTP ${res.status}`);
                            return res.json();
                        })
                );
                const data = await Promise.all(promises);
                
                setResidentsData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching residents:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (residents && residents.length > 0) {
            fetchResidents();
        } else {
            setLoading(false);
        }
    }, [residents]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2>Residentes - {locationName}</h2>
                    <button className='modal-close' onClick={onClose}>✕</button>
                </div>

                <div className='modal-body'>
                    {loading ? (
                        <p>Cargando residentes...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : residentsData.length > 0 ? (
                        <div className='residents-grid'>
                            {residentsData.map(resident => (
                                <div key={resident.id} className='resident-item'>
                                    <img src={resident.image} alt={resident.name} />
                                    <h4>{resident.name}</h4>
                                    <p><strong>Status:</strong> {resident.status}</p>
                                    <p><strong>Species:</strong> {resident.species}</p>
                                    <p><strong>Gender:</strong> {resident.gender}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay residentes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
