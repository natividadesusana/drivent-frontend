import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import drivent from '../../assets/images/drivent.png';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import styled from 'styled-components';
import { signInGit } from '../../services/authApi';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function submitLoginGit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      try {
        const userData = await signInGit(code);
        setUserData(userData);
        navigate('/dashboard');
      } catch (error) {
        toast('Erro no login usando o GitHub');
      }
    }
  }

  async function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = 'c12bc0965186c498af2c';
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000/sign-in',
    });

    const authURL = `${GITHUB_URL}?${params.toString()}`;
    window.location.href = authURL;
  }

  window.addEventListener('load', () => {
    submitLoginGit();
  });

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={drivent} alt="Event Logo" width="200px" style={{ marginTop: '40px' }} />
        {/* <Title>{eventInfo.title}</Title> */}
      </Row>
      <Row>
        <Label style={{ marginTop: '-40px' }}>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
        <ButtonGit onClick={redirectToGitHub}>Login com GitHub</ButtonGit>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const ButtonGit = styled.button`
  border: 1px solid #3f51b5;
  color: #3f51b5;
  background-color: #ffffff;
  width: 100%;
  height: 37px;
  margin-top: 8px !important;
  border-radius: 4px;
  padding: 6px 16px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
`;
