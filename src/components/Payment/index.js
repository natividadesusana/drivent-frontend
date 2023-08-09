import styled from 'styled-components';
import Button from '../Form/Button';
import TicketType from './TicketType';
import { useState } from 'react';
import Card from './Card';
import Form from './Form';
import { useEffect } from 'react';
import useSavePayment from '../../hooks/api/useSavePayment';
import usePayment from '../../hooks/api/usePayment';
import { toast } from 'react-toastify';
import { AiFillCheckCircle } from 'react-icons/ai';
import dayjs from 'dayjs';

export default function PaymentForm(props) {
  const [form, setForm] = useState({ name: '', number: ['****', '****', '****', '****'], valid: '', cvc: '', cardnumber: '' });
  const [pagamento, setPagamento] = useState(false);

  const { savePaymentLoading, savePayment } = useSavePayment();
  const { getPayment } = usePayment();

  useEffect(async() => {
    try {
      const response = await getPayment(props.userTicket.id);
      if(response) {
        setPagamento(true);
      }else {
        setPagamento(false);
      }
    } catch (err) {
      setPagamento(false);
    }
  }, []);

  useEffect(() => {
    if (form.cardnumber !== '') {
      const numbers = form.cardnumber.split(' ');
      if (numbers.length < 5 && numbers.length > 0) {
        const number = [];
        for (let i = 0; i < 4; i++) {
          if (numbers.length > i) {
            number.push(numbers[i]);
          } else {
            number.push('****');
          }
        }
        const newForm = { ...form, number };
        setForm(newForm);
      }
    }
  }, [form.cardnumber]);

  async function payTicket() {
    let bandeira;
    if (form.number[0][0] === 4) {
      bandeira = 'VISA';
    } else {
      bandeira = 'MASTERCARD';
    }
    for (let i = 0; i < form.number.length; i++) {
      if (form.number[i].length !== 4 || isNaN(Number(form.number[i]))) {
        return toast('o numero do cartão esta incorreto');
      }
    }
    if (isNaN(Number(form.cvc))) {
      return toast('o codigo cvc precisa ser um numero');
    }

    if (form.cvc.length !== 3) {
      return toast('o codigo cvc precisa ser um numero de 3 digitos');
    }

    if (form.valid[2] !== '/') {
      return toast('a data precisa ser valida, tente o formato de exemplo: 12/12');
    }
    const data = form.valid.split('/');
    if (isNaN(Number(data[0]))) {
      return toast('a data precisa ser valida, tente o formato de exemplo: 12/12');
    }
    if (isNaN(Number(data[1]))) {
      return toast('a data precisa ser valida, tente o formato de exemplo: 12/12');
    }
    const date = new Date();
    const hoje = dayjs(date).format('DD/MM/YY');
    const vetorHoje = hoje.split('/');
    if (Number(data[0]) > 12 || Number(data[0] < 1)) {
      return toast('O mes de validade precisa ser um mes valido');
    }
    if (Number(vetorHoje[2]) > Number(data[1])) {
      return toast('O ano de validade precisa ser um ano valido');
    } else if (Number(vetorHoje[2]) === Number(data[1])) {
      if (Number(vetorHoje[1]) > Number(data[0])) {
        return toast('O mes de validade precisa ser um mes valido');
      }
    }
    const newData = {
      ticketId: props.userTicket.id,
      cardData: {
        issuer: bandeira,
        number: form.number,
        name: form.name,
        expirationDate: form.valid,
        cvv: form.cvc
      }
    };
    try {
      await savePayment(newData);
      setPagamento(true);
      toast('Pagamento feito com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer o pagamento!');
    }
  }

  return (
    <>
      <TitleStyle>Ingresso escolhido</TitleStyle>
      <TicketType userTicket={props.userTicket} />
      <TitleStyle>Pagamento</TitleStyle>
      <ContainerFormCard pagamento={pagamento} >
        <Card form={form} setForm={setForm} />
        <Form form={form} setForm={setForm} />
      </ContainerFormCard>
      <SubmitContainer disabled={pagamento} pagamento={pagamento} >
        <Button type="submit" onClick={payTicket} disabled={savePaymentLoading} >
          FINALIZAR PAGAMENTO
        </Button>
      </SubmitContainer>
      <PagouContainer pagamento={pagamento}>
        <AiFillCheckCircle />
        <p>
          <strong>Pagamento confirmado!</strong>
          Prossiga para escolha de hospedagem e atividades
        </p>
      </PagouContainer>
    </>
  );
}

const TitleStyle = styled.div`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;
  color: #8E8E8E;
`;

const ContainerFormCard = styled.div`
  gap: 40px;
  display: ${(prop) => prop.pagamento ? 'none' : 'flex'};
`;

const SubmitContainer = styled.div`
  display: ${(prop) => prop.pagamento ? 'none' : 'flex'};
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;

const PagouContainer = styled.div`
  display: ${(prop) => prop.pagamento ? 'flex' : 'none'};
  svg{
    color: #36B853;
    font-size: 44px;
    margin-right: 10px;
  }
  p{
    display: flex;
    flex-direction: column; 
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #454545;
    
    strong{
      font-weight: 700;
    }
  }
`;
