export default function RoomReserved({ infoHotel, infoRoom }) {
  return (
    <>
      <img src={infoHotel.image} alt={infoHotel.name}></img>
      <h1>{infoHotel.name}</h1>
      <h2>Quarto reservado</h2>
      <p>{infoRoom.name} {(infoRoom.capacity === 1) ? '(Single)' : (infoRoom.capacity === 2 ? '(Double)' : '(Triple)')}</p>
      <h2>Pessoas no seu quarto</h2>
      <p>{(infoRoom.Booking.length === 1) ? 'Somente Você' : `Você e mais ${infoRoom.Booking.length - 1}`}</p>
    </>
  );
}
