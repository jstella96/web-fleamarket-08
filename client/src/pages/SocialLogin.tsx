import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';

export default function SocialLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const login = async () => {
      try {
        const code = window.location.search.replace('?code=', '');
        if (!code) return;

        const { data } = await api.socialLogin(code);
        console.log(data);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };

    login();
  }, [navigate]);

  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`}
      >
        GitHub 로그인
      </a>
    </div>
  );
}
