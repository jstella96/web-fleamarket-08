import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import api from 'src/api';
import { GitHub } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { userState } from 'src/recoil/atoms/user';
import { absoluteBottom, absoluteCenter, flexColumn } from 'src/styles/common';
import styled from 'styled-components/macro';

export default function Start() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleClickMockLoginButton = async () => {
    const { data } = await api.mockLogin();
    setUser(data);
    navigate('/home', { replace: true });
  };

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user, navigate]);

  return (
    <Container>
      <TitleContainer>
        <h1>우아마켓</h1>
      </TitleContainer>
      <ButtonsContainer>
        <GitHubLoginLink
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`}
        >
          <GitHub />
          GitHub 계정으로 시작하기
        </GitHubLoginLink>
        <BaedalLoginButton onClick={handleClickMockLoginButton}>
          배달이로 시작하기
        </BaedalLoginButton>
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${COLORS.primary1};
  height: 100vh;
`;

const TitleContainer = styled.div`
  ${absoluteCenter};
  padding-bottom: 25%;
  white-space: nowrap;
  text-align: center;
  font-family: 'Do Hyeon', sans-serif;

  h1 {
    font-size: 4.5rem;
    color: ${COLORS.white};
  }
`;

const ButtonsContainer = styled.div`
  ${absoluteBottom};
  left: 0;
  ${flexColumn};
  gap: 1.25rem;
  width: 100%;
  padding: 2rem 1rem;

  button {
    min-height: 3rem;
  }
`;

const GitHubLoginLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #171515;
  color: ${COLORS.white};
`;

const BaedalLoginButton = styled.button`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid white;
  background-color: ${COLORS.primary2};
`;
