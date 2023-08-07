import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NoEnrollmentMsg } from '../../../components/Tickets/NoEnrollmentMsg';
import { TicketSelection } from '../../../components/Tickets/TicketSelection';
import { getEnrollment, verifyIfUserHasTicket } from '../../../services/ticketApi';

export default function Payment() {
  const [enrollment, setEnrollment] = useState(null);
  const [userTicket, setUserTicket] = useState(null);
  const infoJSON = localStorage.getItem('userData');
  const userData = JSON.parse(infoJSON);
  const token = userData.token;

  useEffect(async() => {
    try {
      const enr = await getEnrollment(token);
      setEnrollment(enr);
      verifyUserTicket(token);
    } catch (err) {
      setEnrollment(false);
    }
  }, []);
  async function verifyUserTicket(token) {
    try {
      const userTicket = await verifyIfUserHasTicket(token);
      setUserTicket(userTicket);
    } catch (err) {
      setUserTicket(false);
    }
  }
  if (enrollment === null || userTicket === null) {
    return <Container>Carregando...</Container>;
  }
  
  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      {enrollment ? 
        ( userTicket === false ? <TicketSelection setUserTicket={setUserTicket}/> 
          : 'Trocar pelo Payment') 
        : <NoEnrollmentMsg /> }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  h1 {
    color: #000000;
    font-size: 34px;
  }
`;
