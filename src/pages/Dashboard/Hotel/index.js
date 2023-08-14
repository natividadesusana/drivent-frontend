import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import BoxHotel from './BoxHotel';
import { acomodacao, capacidade, createIcons } from './functions';
import RoomBox from './RoomBox';
import RoomReserved from './RoomReserved';
import { ContainerReserve, HotelBox, HotelContainer, HotelList, Room, RoomCrowded, RoomList, SubtitleContainer, TitleContainer } from './styled';

export default function Hotel() {
  const { ticket } = useTicket();
  const [listHotels, setListHotels] = useState([]); //lista de hoteis
  const [chosenHotel, setchosenHotel] = useState(undefined); //ID hotel selecionado
  const [chosenRoom, setChosenRoom] = useState(undefined); //ID quarto selecionado
  const [listRooms, setListRooms] = useState([]); //lista de quartos
  const [bookingId, setBookingId] = useState(undefined); //id da reserva
  const [put, setPut] = useState(false); //ativa o modo de troca de quarto
  const [booking, setBooking] = useState(false); //ativa a tela de quarto reservado
  const [infoRoom, setInfoRoom] = useState({}); // informações do quarto reservado
  const [infoHotel, setInfoHotel] = useState({}); // informações do hotel escolhido
  const token = useToken();
  const config = {
    headers:
      { Authorization: `Bearer ${token}` }
  };
  //console.log(listHotels);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking`, config)
      .then((res) => {
        setBookingId(res.data.id);
        setInfoRoom(res.data.Room);
        setBooking(true);
        setInfoHotel(res.data.Room.Hotel);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setPut(false);
          console.log('usuário não tem quarto reservado');
        }
      });

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, config)
      .then((res) =>  {
        console.log(res.data);
        setListHotels(res.data);
      })

      .catch((err) => console.log(err.message));
  }, []);
  function selectedHotel(hotel) {
    setchosenHotel(hotel.id);
    setInfoHotel(hotel);
    setChosenRoom(undefined);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels/${hotel.id}`, config)
      .then((res) => setListRooms(res.data.Rooms))
      .catch((err) => console.log(err.message));
  }
  function selectedRoom(room) {
    setChosenRoom(room.id);
    setInfoRoom(room);
  }

  function reserveRoom(id) {
    const body = { roomId: id };

    try {
      if (put === false) {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking`, body, config)
          .then((res) => {
            setBookingId(res.data.bookingId);
            setBooking(true);
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking`, config)
              .then((res) => setInfoRoom(res.data.Room));
          });
      } else if (put === true) {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/booking/${bookingId}`, body, config)
          .then((res) => {
            setBookingId(res.data.bookingId);
            setBooking(true);
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking`, config)
              .then((res) => setInfoRoom(res.data.Room));
          });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  function changeRoom() {
    setPut(true);
    setBooking(false);
    setchosenHotel(undefined);
    setChosenRoom(undefined);
    setListRooms([]);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, config)
      .then((res) => setListHotels(res.data))
      .catch((err) => console.log(err.message));
  }

  if (booking === true) {
    return (
      <>
        <HotelContainer>
          <TitleContainer>Escolha de hotel e quarto</TitleContainer>
          <h3>Você já escolheu seu quarto</h3>
          <HotelBox>
            <RoomReserved
              infoHotel={infoHotel}
              infoRoom={infoRoom}
            />
          </HotelBox>

          <button onClick={() => changeRoom()}>TROCAR DE QUARTO</button>
        </HotelContainer>
      </>
    );
  }

  if (!ticket || ticket.status === 'RESERVED') {
    return (
      <>
        <HotelContainer>
          <TitleContainer>Escolha de hotel e quarto</TitleContainer>
          <h3>Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem</h3>
        </HotelContainer>
      </>
    );
  }

  if (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
    return (
      <>
        <HotelContainer>
          <TitleContainer>Escolha de hotel e quarto</TitleContainer>
          <h3>Sua modalidade de ingresso não inclui hospedagem</h3>
          <h3>Prossiga para a escolha de atividades</h3>
        </HotelContainer>
      </>
    );
  }
  
  return (
    <HotelContainer>
      <TitleContainer>Escolha de hotel e quarto</TitleContainer>
      <SubtitleContainer>Primeiro, escolha seu hotel</SubtitleContainer>
      <HotelList>
        {listHotels.length > 0 ? listHotels.map((h, i) => (
          <BoxHotel
            name={h.name}
            image={h.image}
            id={h.id}
            key={i}
            selectedHotel={selectedHotel}
            chosenHotel={chosenHotel}
            hotel={h}
            rooms={h.Rooms}
            capacidade={capacidade}
            acomodacao={acomodacao}
          />)) : 'Carregando'}
      </HotelList>
      <ContainerReserve>
        {(chosenHotel !== undefined) && <h1>Ótima pedida! Agora escolha o quarto</h1>}
        <RoomList>
          {listRooms.length > 0 ? listRooms.map((r, i) => (
            (r.capacity > r.Booking.length) ?
              <Room
                onClick={() => selectedRoom(r)}
                key={i}
                chosenRoom={chosenRoom}
                id={r.id}>
                <RoomBox
                  name={r.name}
                  createIcons={createIcons}
                  id={r.id}
                  r={r}
                  chosenRoom={chosenRoom}
                />
              </Room> : <RoomCrowded
                key={i}
                chosenRoom={chosenRoom}
                id={r.id}>
                <p>{r.name}</p>
                <div>
                  {r.Booking.map((h, i) => <Person
                    key={i}
                    chosenRoom={chosenRoom}
                    id={r.id} />)}
                </div>
              </RoomCrowded>
          )) : ''}
        </RoomList>

        {chosenRoom && <button onClick={() => reserveRoom(chosenRoom)}>RESERVAR QUARTO</button>}
      </ContainerReserve>
    </HotelContainer >
  );
};

function Person({ chosenRoom, id }) {
  return (
    <IoPersonSharp
      color={(chosenRoom === id) ? '#fc03ca' : '#00000'}
      height="25px"
      width="25px"
    />
  );
}
