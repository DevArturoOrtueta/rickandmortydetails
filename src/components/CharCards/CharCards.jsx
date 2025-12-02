import React from 'react'

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
        location = {}
    } = char || {};

    console.log('CharCards props normalized:', { id, name, status, species, image, location });

    return (
        <div className='charcard-main' /* key should be on parent map, not here */>
            {image ? <img src={image} alt={name} /> : <div className="placeholder-img">No image</div>}
            <h3>{name}</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Species:</strong> {species}</p>
            <p><strong>Location:</strong> {location && location.name ? location.name : 'Unknown'}</p>
        </div>
    )
}
