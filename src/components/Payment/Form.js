import styled from 'styled-components';

export default function Form(props) {
  function handleForm(e) {
    props.setForm({ ...props.form, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer>
      <InputCardNumber
        placeholder="Card Number"
        type="text"
        id="cardnumber"
        name="cardnumber"
        value={props.form.cardnumber}
        onChange={handleForm}
        required
      />
      <p>E.g.: 49..,59..,68..,74..</p>
      <InputCardName
        placeholder="Name"
        type="text"
        id="name"
        name="name"
        value={props.form.name}
        onChange={handleForm}
        required
      />
      <div>
        <InputValid
          placeholder="Valid Thru"
          type="text"
          id="valid"
          name="valid"
          value={props.form.valid}
          onChange={handleForm}
          required
        />
        <InputCVC
          placeholder="CVC"
          type="text"
          id="cvc"
          name="cvc"
          value={props.form.cvc}
          onChange={handleForm}
          required
        />
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  p{
    color: #B6B7B7;
    font-size: 15px;
    margin-top: 5px;
  }
  > div{
    width: 290px;
    display: flex;
    gap: 5%
  }
`;

const InputCardNumber = styled.input`
  font-size: 19px;
  font-weight: 500;
  width: 290px;
  height: 50px;
  border: 1px solid #B6B7B7;
  border-radius: 7px;
`;

const InputCardName = styled.input`
  font-size: 19px;
  font-weight: 500;
  width: 290px;
  height: 50px;
  border: 1px solid #B6B7B7;
  border-radius: 7px;
  margin-top: 15px;
`;

const InputValid = styled.input`
  font-size: 19px;
  font-weight: 500;
  width: 70%;
  height: 50px;
  border: 1px solid #B6B7B7;
  border-radius: 7px;
  margin-top: 15px;
`;

const InputCVC = styled.input`
  font-size: 19px;
  font-weight: 500;
  width: 25%;
  height: 50px;
  border: 1px solid #B6B7B7;
  border-radius: 7px;
  margin-top: 15px;
`;
