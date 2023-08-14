import { HotelBox } from './styled';

export default function BoxHotel({ name, image, id, selectedHotel, chosenHotel, hotel, rooms, capacidade, acomodacao }) {
  console.log(hotel.id);
  return (
    <HotelBox
      onClick={() => selectedHotel(hotel)}
      chosenHotel={chosenHotel}
      id={id}>
      <img src={image} alt={name}></img>
      <h1>{name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>{() => acomodacao(rooms)}</p>
      <h2>Vagas disponíveis:</h2>
      <p>{() => capacidade(rooms)}</p>
    </HotelBox>
  );
}
