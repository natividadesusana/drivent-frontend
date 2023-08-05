import styled from 'styled-components';
import Button from '../Form/Button';
import TicketType from './TicketType';
import { useState } from 'react';
import Card from './Card';
import Form from './Form';
import { useEffect } from 'react';
import usePayment from '../../hooks/api/usePayment';
import { toast } from 'react-toastify';

export default function PaymentForm() {
  const [form, setForm] = useState({ name: '', number: ['****', '****', '****', '****'], valid: '', cvc: undefined, cardnumber: '' });

  const { savePaymentLoading, savePayment } = usePayment();

  useEffect(() => {
    if (form.cardnumber !== '') {
      const numbers = form.cardnumber.split(',');
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
    if(form.number[0][0] === 4) {
      bandeira = 'VISA';
    }else{
      bandeira = 'MASTERCARD';
    }
    const newData = {
      ticketId: 1,
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
      toast('Pagamento feito com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer o pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <TitleStyle>Ingresso escolhido</TitleStyle>
      <TicketType />
      <TitleStyle>Pagamento</TitleStyle>
      <ContainerFormCard>
        <Card form={form} setForm={setForm} />
        <Form form={form} setForm={setForm} />
      </ContainerFormCard>
      <SubmitContainer>
        <Button type="submit" onClick={payTicket} disabled={savePaymentLoading} >
          FINALIZAR PAGAMENTO
        </Button>
      </SubmitContainer>
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
  margin: 40px 0px 20px 0px !important;
`;

const StyledTypography = styled.div`
  margin-bottom: 20px!important;
`;

const ContainerFormCard = styled.div`
  display: flex;
  gap: 40px
`;

const SubmitContainer = styled.div`
  margin-top: 40px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;
