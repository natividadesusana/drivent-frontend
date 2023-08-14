import { IoPersonOutline } from 'react-icons/io5';

export function acomodacao(rooms) {
  let tipos = [];
  let string = '';
  rooms.map(c => tipos.push(c.capacity));
  if (tipos.includes(1)) {
    string += 'Single';
    if (tipos.includes(2) || tipos.includes(3)) {
      string += ', ';
    }
  }
  if (tipos.includes(2)) {
    string += 'Double';
    if (tipos.includes(3)) {
      string += ', ';
    }
  }
  if (tipos.includes(3)) {
    string += 'Triple';
  }
  return string;
}

export function capacidade(rooms) {
  let soma = 0;
  for (let i = 0; i < rooms.length; i++) {
    soma += (rooms[i].capacity - rooms[i].Booking.length);
  }
  return soma;
}

export function createIcons(room) {
  let icone = [];
  for (let i = 0; i < (room.capacity - room.Booking.length); i++) {
    icone.push(
      < IoPersonOutline
        color={'#00000'}
        height="25px"
        width="25px"
        key={i}
      />);
  }
  return icone;
}
