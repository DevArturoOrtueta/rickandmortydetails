import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './CharCards.css'

// Tarjeta para mostrar la informacion de un personaje
export const CharCards = (props) => {
    // Normalize input: support either <CharCards data={obj} /> or <CharCards {...obj} />
    const char = props.data && typeof props.data === 'object' ? props.data : props;

    const {
        id,
        name = 'Unknown',
        status = 'Unknown',
        species = 'Unknown',
        image = '',
        location = {},
        episode = []
    } = char || {};

    console.log('CharCards props normalized:', { id, name, status, species, image, location });

    const [open, setOpen] = useState(false);
    const [locData, setLocData] = useState(null);
    const [episodesData, setEpisodesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mantener el scroll bloqueado en el body mientras el modal esté abierto
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const body = document.body;
        if (open) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
        }
        // cleanup en caso de desmontaje
        return () => {
            body.classList.remove('modal-open');
        };
    }, [open]);

    const openModal = async (e) => {
        e.stopPropagation();
        setOpen(true);
        setLoading(true);
        setError(null);
        setLocData(null);
        setEpisodesData([]);

        try {
            // fetch location if available
            if (location && location.url) {
                const resLoc = await fetch(location.url);
                if (!resLoc.ok) throw new Error('Error fetching location');
                const locJson = await resLoc.json();
                setLocData(locJson);
            }

            // fetch episodes in a single request by extracting ids
            if (Array.isArray(episode) && episode.length > 0) {
                const ids = episode.map(url => url.split('/').pop()).join(',');
                const epRes = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
                if (!epRes.ok) throw new Error('Error fetching episodes');
                const epJson = await epRes.json();
                const epArray = Array.isArray(epJson) ? epJson : [epJson];
                setEpisodesData(epArray);
            }
        } catch (err) {
            setError(err.message || 'Fetch error');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = (e) => {
        if (e) e.stopPropagation();
        setOpen(false);
        setLocData(null);
        setEpisodesData([]);
        setError(null);
    };

    return (
        <div className='charcard-main' onClick={openModal} role="button" tabIndex={0}>
            <div className='charcard-image'>
                {image ? <img src={image} alt={name} /> : <div className="placeholder-img">No image</div>}
            </div>
            <div className='charcard-information'>
                <h3>{name}</h3>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Species:</strong> {species}</p>
                <p><strong>Location:</strong> {location && location.name ? location.name : 'Unknown'}</p>
            </div>

            {/* modal rendered via portal so it sits at document.body and occupies full screen */}
            {open && typeof document !== 'undefined' && createPortal(
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal} aria-label="Cerrar">×</button>
                        <h2>{name}</h2>

                        {loading ? (
                            <p className="modal-loading">Cargando...</p>
                        ) : error ? (
                            <p className="modal-error">{error}</p>
                        ) : (
                            <>
                                <section className="modal-section">
                                    <h3>Location</h3>
                                    {locData ? (
                                        <div className="location-details">
                                            <p><strong>Name:</strong> {locData.name}</p>
                                            {locData.type && <p><strong>Type:</strong> {locData.type}</p>}
                                            {locData.dimension && <p><strong>Dimension:</strong> {locData.dimension}</p>}
                                            <p><strong>Residents:</strong> {Array.isArray(locData.residents) ? locData.residents.length : 0}</p>
                                        </div>
                                    ) : (
                                        <p>No hay información de ubicación disponible</p>
                                    )}
                                </section>

                                <section className="modal-section">
                                    <h3>Episodes ({episodesData.length})</h3>
                                    {episodesData.length > 0 ? (
                                        <ul className="episodes-list">
                                            {episodesData.map(ep => (
                                                <li key={ep.id}>
                                                    <strong>{ep.episode}</strong> — {ep.name} ({ep.air_date})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay episodios disponibles</p>
                                    )}
                                </section>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
