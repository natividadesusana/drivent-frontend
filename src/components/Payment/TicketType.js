import styled from 'styled-components';

export default function TicketType(props) {
  return(
    <ContainerTicket> 
      <p> 
        {props.userTicket.TicketType.isRemote ? 
          'Online' : 
          props.userTicket.TicketType.includesHotel ? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'} 
      </p>
      <p className='price'>R$ {props.userTicket.TicketType.price}</p>
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
