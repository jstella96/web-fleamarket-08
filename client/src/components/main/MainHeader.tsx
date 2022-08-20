import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Category, Menu, User } from 'src/assets/icons';
import { userState } from 'src/recoil/atoms/user';

export default function Header() {
  const user = useRecoilValue(userState);

  return (
    <header>
      <Link to={`${user ? '/profile' : '/login'}`}>
        <User />
      </Link>
      <Link to="/category">
        <Category />
      </Link>
      <Link to="/mypage">
        <Menu></Menu>
      </Link>
    </header>
  );
}
