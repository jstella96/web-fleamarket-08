import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/recoil/atoms/user';
import Login from '../pages/Login';

export default function Unauthorized() {
  const user = useRecoilValue(userState);
  if (user) return <>{<Outlet />}</>;
  return <Login />;
}
