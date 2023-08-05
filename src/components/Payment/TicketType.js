import styled from 'styled-components';

export default function TicketType() {
  return(
    <ContainerTicket> 
      <p>Presencial + Com Hotel</p>
      <p className='price'>R$ 600</p>
    </ContainerTicket>
  );
}

const ContainerTicket = styled.div`
    width: 290px;
    height: 108px;
    border-radius: 20px;
    background-color: #FFEED2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    p{
      font-family: 'Roboto';
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;
    }
    .price{
      color: #898989;
    }
`;
