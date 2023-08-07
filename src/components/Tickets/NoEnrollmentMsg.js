import styled from 'styled-components';

export function NoEnrollmentMsg() {
  return (
    <Container>
      <h2>Você precisa completar sua inscrição antes</h2>
      <h2> de prosseguir pra escolha de ingresso</h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25%;
  h2 {
    color: #8E8E8E;
    font-size: 20px;
  }
`;
