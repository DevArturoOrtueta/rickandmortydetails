import { useState } from 'react';
import '../LocaCards/LocaCards.css';
import { ResidentsModal } from '../ResidentsModal/ResidentsModal.jsx';

// Tarjeta para mostrar la informacion de un personaje
export const LocaCards = (props) => {
    // Normalize input: support either <CharCards data={obj} /> or <CharCards {...obj} />
    const loca = props.data && typeof props.data === 'object' ? props.data : props;

    const {
        id,
        name = 'Unknown',
        type = 'Unknown',
        dimension = 'Unknown',
        residents = [],
        url = '',
        created = ''
    } = loca || {};

    const [showModal, setShowModal] = useState(false);

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
        <>
            <div
                className='charcard-main'
                onClick={() => setShowModal(true)}
                style={{ cursor: 'pointer' }}
            >
                <div className='charcard-information'>
                    <h3>{name}</h3>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Dimension:</strong> {dimension}</p>
                    <p><strong>Created:</strong> {createdDate}</p>
                    <p className='residents-count'><strong>Residentes:</strong> {residents.length || 0}</p>
                </div>
            </div>
            {showModal && (
                <ResidentsModal
                    locationName={name}
                    residents={residents}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}