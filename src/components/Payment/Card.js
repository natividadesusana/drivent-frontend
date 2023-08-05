import styled from 'styled-components';

export default function Card(props) {
  return (
    <CardContainer>
      <div className='chip'></div>
      <NumeroCartao>{props.form.number[0]}  {props.form.number[1]}  {props.form.number[2]}  {props.form.number[3]}</NumeroCartao>
      <div className='cardInfo'>
        <NomeCartao>{props.form.name === '' ? 'YOUR NAME HERE' : props.form.name.toUpperCase()}</NomeCartao>
        <DataCartao><p>valid thru</p><br /><p>{props.form.valid === '' ? '**/**' : props.form.valid}</p></DataCartao>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 194px;
  border-radius: 15px;
  background-color: #929292;
  .chip{
    margin-top: 30px;
    margin-left: 30px;
    width: 50px;
    height: 30px;
    border-radius: 5px;
    background-color: #F7CF70
  }
  .cardInfo{
    display: flex;
    gap: 10px;
  }
`;

const NumeroCartao = styled.div`
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  display: inline-block;
  margin-left: 30px;
  margin-top: 50px;
  width: 100%;
`;

const NomeCartao = styled.div`
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  display: inline-block;
  margin-left: 30px;
  margin-top: 15px;
`;

const DataCartao = styled.div`
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 9px;
  letter-spacing: 0em;
  text-align: center;
  display: inline-block;
  margin-top: 12px;
`;
