import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NoEnrollmentMsg } from '../../../components/Tickets/NoEnrollmentMsg';
import { TicketSelection } from '../../../components/Tickets/TicketSelection';
import { getEnrollment, verifyIfUserHasTicket } from '../../../services/ticketApi';
import PaymentForm from '../../../components/Payment';

export default function Payment() {
  const [enrollment, setEnrollment] = useState(null);
  const [userTicket, setUserTicket] = useState(false);
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
      const ticket = await verifyIfUserHasTicket(token);
      if (ticket) {
        return setUserTicket(ticket);
      }
      setUserTicket(false);
    } catch (err) {
      setUserTicket(false);
    }
  }
  if (enrollment === null ) {
    return <Container>Carregando...</Container>;
  }

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      {enrollment ? 
        ( userTicket === false ? <TicketSelection setUserTicket={setUserTicket}/> 
          : <PaymentForm userTicket={userTicket} />) 
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
