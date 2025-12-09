import '../EpiCards/EpiCards.css';

// Tarjeta para mostrar la informacion de un personaje
export const EpiCards = (props) => {
    // Normalize input: support either <CharCards data={obj} /> or <CharCards {...obj} />
    const epi = props.data && typeof props.data === 'object' ? props.data : props;

    const {
        id,
        name = 'Unknown',
        air_date = 'Unknown',
        episode = 'Unknown',
        characters = [],
        url = '',
        created = ''
    } = epi || {};

    // Format created to yyyy-mm-dd (safe)
    const formatDate = (iso) => {
        if (!iso) return 'Unknown';
        if (typeof iso === 'string' && iso.includes('T')) {
            return iso.split('T')[0];
        }
        try {
            const d = new Date(iso);
            if (isNaN(d.getTime())) return 'Unknown';
            return d.toISOString().slice(0, 10);
        } catch {
            return 'Unknown';
        }
    };

    const createdDate = formatDate(created);

    return (
        <div className='charcard-main' /* key should be on parent map, not here */>
            
            <div className='charcard-information'>
                <h3>{name}</h3>
                <p><strong>Episode:</strong> {episode}</p>
                <p><strong>Created:</strong> {createdDate}</p>
                <p><strong>Air Date:</strong> {air_date}</p>
            </div>

        </div>
    )
}