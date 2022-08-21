import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import api from 'src/api';
import { userState } from 'src/recoil/atoms/user';

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
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`}
      >
        GitHub 로그인
      </a>
      <button
        onClick={async () => {
          const { data } = await api.mockLogin();
          setUser(data);
        }}
      >
        배달이로 로그인
      </button>
    </div>
  );
}
