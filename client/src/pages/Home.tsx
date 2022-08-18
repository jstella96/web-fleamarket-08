import { Link } from 'react-router-dom';
import api from 'src/api';
export default function Home() {
  const sessionTest = () => {
    api.socialLoginTest();
  };
  return (
    <div>
      <Link to="/login">로그인 페이지로 이동</Link>
      <button onClick={sessionTest}></button>
    </div>
  );
}
