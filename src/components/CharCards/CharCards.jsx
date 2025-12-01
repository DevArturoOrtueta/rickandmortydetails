// Tarjeta para mostrar la informacion de un personaje
export const CharCards = ( data) => {
    console.log("data en charcards ", data);


    const {name, id, status, image, species} = data.data
    return (
        <div className='charcard-main' key={id}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Species:</strong> {species}</p>
        </div>
    )
}
