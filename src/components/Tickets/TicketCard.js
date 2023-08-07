import styled from 'styled-components';

export function TicketCard({ onClick, title, price, some, isSelected }) {
  return (
    <Card onClick={onClick} isSelected={isSelected}>
      <h4>{title}</h4>
      <p>{some ? '+' : ''}R$ {price}</p>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  border: 1px #CECECE solid;
  border-radius: 20px;
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : 'tranparent')};
  cursor: pointer;
  h4 {
    font-size: 16px;
    color: #454545;
  }
  p {
    font-size: 14px;
    color: #898989;
  }
`;

