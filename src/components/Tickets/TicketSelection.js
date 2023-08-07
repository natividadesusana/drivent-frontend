import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createTicketById, getTicketType } from '../../services/ticketApi';
import { TicketCard } from './TicketCard';

export function TicketSelection({ setUserTicket }) {
  const [ticketTypes, setTicketTypes] = useState(null);
  const [remote, setRemote] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);
  const [ticketSelected, setTicketSelected] = useState(null);
  const infoJSON = localStorage.getItem('userData');
  const userData = JSON.parse(infoJSON);
  const userId = userData.user.id;
  const token = userData.token;
  
  useEffect(async() => {
    const response = await getTicketType(userId, token);
    setTicketTypes(response);
    /*
    const uniqueTypes = new Set();
    response.forEach(ticket => {
      if (!types.some(t => t.isRemote === ticket.isRemote)) {
        setTypes([...types, ticket]);
      }
    });
    setTypes(Array.from(uniqueTypes));
    */
  }, []);
  async function createTicket(ticket) {
    try {
      const t = await createTicketById(ticket.id, token);
      setUserTicket(t);
    } catch (err) {
      setUserTicket(null);
    }
  }
  if (!ticketTypes) {
    return <Container>Carregando...</Container>;
  }
  return (
    <Container>
      <Phases>
        <h3>Primeiro, escolha sua modalidade de ingresso</h3>
        <div>
          <TicketCard 
            onClick={() => {
              //if (!t.isRemote) setTicketSelected(ticketTypes.find(t => t['isRemote'] === false));
              if (remote || remote === null) {
                setRemote(false);
                setTicketSelected(null);
              }
              return;
            }}
            title={'Presencial'} 
            price={250} 
            some={false}
            isSelected={remote === false}/>
          <TicketCard 
            onClick={() => {
              if (!remote) {
                setTicketSelected(ticketTypes.find(t => t['isRemote'] === true));
                setRemote(true);
              }
              return;
            }}
            title={'Online'} 
            price={100} 
            some={false}
            isSelected={remote === true}/>
        </div>
      </Phases>
      {(remote === false) ? 
        <Phases>
          <h3>Ótimo! Agora escolha sua modalidade de hospedagem</h3>
          <div>

            <TicketCard onClick={() => {
              if (hasHotel || hasHotel === null) {
                setTicketSelected(ticketTypes.find(t => t['isRemote'] === false ?? t['includesHotel'] === false));
                setHasHotel(false);}
            }
            }
            title={'Sem Hotel'} 
            price={0} 
            some={true}
            isSelected={hasHotel === false}
            />
            <TicketCard onClick={() => {
              if (!hasHotel) {
                setTicketSelected(ticketTypes.find(t => t['isRemote'] === false && t['includesHotel'] === true));
                setHasHotel(true);}} 
            }
            title={'Com Hotel'} 
            price={350} 
            some={true}
            isSelected={hasHotel === true}/>
          </div>
        </Phases>: null}
      {ticketSelected ? <Phases>
        <h3>Fechado! O total ficou em R$ <span>{ticketSelected.price}</span>. Agora é só confirmar:</h3>
        <button onClick={() => createTicket(ticketSelected)}>RESERVAR INGRESSO</button>
      </Phases> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Phases = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    font-size: 20px;
    color: #8E8E8E;
  }
  div {
    display: flex;
    gap: 10px;
  }
  button {
    height: 37px;
    width: 180px;
    border-radius: 4px;
    background-color: #DDDDDD;
    border: none;
    font-size: 14px;
    color: #000000;
    margin-top: 15px;
    cursor: pointer;
  }
  span {
    color: bold;
  }
`;
