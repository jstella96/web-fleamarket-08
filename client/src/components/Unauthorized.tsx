import { Link, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/recoil/atoms/user';

export default function Unauthorized() {
  const user = useRecoilValue(userState);
  if (user) return <>{<Outlet />}</>;
  return (
    <div>
      <h2>로그인을 하고 이용해주세요</h2>
      <Link to="/login">로그인하기</Link>
    </div>
  );
}
