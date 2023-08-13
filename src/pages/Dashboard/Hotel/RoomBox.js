import { IoPersonSharp } from 'react-icons/io5';

export default function RoomBox({ id, name, createIcons, r, chosenRoom }) {
  return (
    <>
      <p>{name}</p>
      <div>
        {createIcons(r)}
        {r.Booking.map((h, i) => <Person
          key={i}
          id={id}
          chosenRoom={chosenRoom} />)}
      </div>
    </>
  );
}

function Person({ chosenRoom, id }) {
  return (
    <IoPersonSharp
      color={(chosenRoom === id) ? '#fc03ca' : '#00000'}
      height="25px"
      width="25px"
    />
  );
}
