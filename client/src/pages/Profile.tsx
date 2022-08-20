import { useNavigate } from 'react-router-dom';
import { LogOut } from 'src/assets/icons';
import Header from 'src/components/common/Header';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Header title="프로필" />
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        <LogOut />
      </button>
    </>
  );
}
