import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import api from 'src/api';
import { GitHub } from 'src/assets/icons';
import Button from 'src/components/common/Button';
import Layout from 'src/components/common/Layout';
import colors from 'src/constants/colors';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    const login = async () => {
      if (isLoading) return;

      try {
        const code = window.location.search.replace('?code=', '');
        if (!code) return;

        setIsLoading(true);
        const { data } = await api.socialLogin(code);
        setUser(data);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };

    login();
  }, [isLoading, navigate, setUser]);

  if (isLoading) return <p>로그인 중입니다. 잠시만 기다려주세요.</p>;

  return (
    <Layout title="로그인">
      <Container>
        <GitHubLoginLink
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`}
        >
          <GitHub />
          GitHub 계정으로 로그인
        </GitHubLoginLink>
        <Button
          onClick={async () => {
            const { data } = await api.mockLogin();
            setUser(data);
          }}
        >
          배달이로 로그인
        </Button>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
`;

const GitHubLoginLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #171515;
  color: ${colors.white};
`;
