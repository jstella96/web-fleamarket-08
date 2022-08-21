import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import api from 'src/api';
import { LogOut } from 'src/assets/icons';
import Header from 'src/components/common/Header';
import { userState } from 'src/recoil/atoms/user';

export default function Profile() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <>
      <Header title="프로필" />
      <button
        onClick={async () => {
          await api.logout();
          setUser(null);
          navigate('/');
        }}
      >
        <LogOut />
      </button>
    </>
  );
}
