import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import api from 'src/api';
import Loading from 'src/components/common/Loading';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
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
        navigate('/home', { replace: true });
      } catch (err) {
        console.error(err);
      }
    };

    login();
  }, [isLoading, navigate, setUser]);

  if (isLoading) {
    return (
      <Container>
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <Loading />
      </Container>
    );
  }

  return <></>;
}

const Container = styled.div`
  padding-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
`;
