import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PersonOutline } from 'react-ionicons';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { ticket } = useTicket();
  const [listHotels, setListHotels] = useState([]);
  const [chosenHotel, setChosenHotel] = useState(undefined);
  const [chosenRoom, setChosenRoom] = useState(undefined);
  const [listRooms, setListRooms] = useState([]);
  const [capacity] = useState(0);
  const { token } = useToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, config)
      .then((res) => {
        setListHotels(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  function selectedHotel(id) {
    setChosenHotel(id);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${id}`, config)
      .then((res) => {
        setListRooms(res.data.Rooms);
      })
      .catch((err) => console.log(err.message));
  }
  function selectedRoom(id) {
    setChosenRoom(id);
  }

  if (!ticket || ticket.status === 'RESERVED') {
    return (
      <>
        <HotelContainer>
          <TitleContainer>Escolha de hotel e quarto</TitleContainer>
          <p>Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem</p>
        </HotelContainer>
      </>
    );
  }

  if (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
    return (
      <>
        <HotelContainer>
          <TitleContainer>Escolha de hotel e quarto</TitleContainer>
          <p>Sua modalidade de ingresso não inclui hospedagem</p>
          <p>Prossiga para a escolha de atividades</p>
        </HotelContainer>
      </>
    );
  }

  return (
    <HotelContainer>
      <TitleContainer>Escolha de hotel e quarto</TitleContainer>
      <SubtitleContainer>Primeiro, escolha seu hotel</SubtitleContainer>
      <HotelList>
        {listHotels.map((h, i) => (
          <BoxHotel
            Rooms={h.Rooms}
            name={h.name}
            image={h.image}
            id={h.id}
            key={i}
            selectedHotel={selectedHotel}
            chosenHotel={chosenHotel}
            capacity={capacity}
          />
        ))}
      </HotelList>
      <ContainerReserve>
        <RoomList>
          {listRooms.map((r, i) => (
            <Room onClick={() => selectedRoom(r.id)} key={i} chosenRoom={chosenRoom} id={r.id}>
              <p>{r.name}</p>
              <div>{r.capacity === 1 ? <SinglePerson /> : r.capacity === 2 ? <DoublePerson /> : <TriplePerson />}</div>
            </Room>
          ))}
        </RoomList>

        {chosenRoom && <button>Reservar Quarto</button>}
      </ContainerReserve>
    </HotelContainer>
  );
}

function SinglePerson() {
  return <PersonOutline color={'#00000'} height="20px" width="20px" />;
}

function DoublePerson() {
  return (
    <>
      <PersonOutline color={'#00000'} height="20px" width="20px" />
      <PersonOutline color={'#00000'} height="20px" width="20px" />
    </>
  );
}

function TriplePerson() {
  return (
    <>
      <PersonOutline color={'#00000'} height="20px" width="20px" />
      <PersonOutline color={'#00000'} height="20px" width="20px" />
      <PersonOutline color={'#00000'} height="20px" width="20px" />
    </>
  );
}

function BoxHotel({ name, image, id, selectedHotel, chosenHotel, capacity, Rooms }) {
  return (
    <HotelBox onClick={() => selectedHotel(id)} chosenHotel={chosenHotel} id={id}>
      <img src={image} alt={name}></img>
      <h1>{name}</h1>
      <h2>Tipos de acomodação:</h2>
      <p>Single, Double, Triple</p>
      <h2>Vagas disponíveis:</h2>
      <p>{capacity}</p>
    </HotelBox>
  );
}

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HotelBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  background-color: ${(p) => (p.chosenHotel === p.id ? 'lightyellow' : '#ececec')};
  margin-right: 15px;
  margin-bottom: 50px;
  border-radius: 10px;
  align-items: flex-start;
  padding: 10px;

  img {
    width: 100%;
    height: 40%;
  }

  h1 {
    font-size: 19px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  p {
    font-size: 11px;
    margin-bottom: 15px;
  }
`;

const TitleContainer = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const SubtitleContainer = styled.p`
  font-size: 15px;
  margin-bottom: 20px;
`;

const HotelList = styled.div`
  display: flex;
  width: auto;
  height: auto;
  padding: 5px;
  background: white;
`;

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  margin-bottom: 100px;
`;

const Room = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 30px;
  background-color: ${(p) => (p.chosenRoom === p.id ? 'lightyellow' : 'white')};
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  border: solid 1px black;

  p {
    font-size: 15px;
  }
`;

const ContainerReserve = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 50px;
    height: 50px;
    background: #ececec;
  }
`;
