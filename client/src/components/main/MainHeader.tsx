import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Category, MapPin, Menu, User } from 'src/assets/icons';
import colors from 'src/constants/colors';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Header() {
  const user = useRecoilValue(userState);

  return (
    <Container>
      <Link to="/category">
        <Category />
      </Link>
      <Location>
        <MapPin />
        장소
      </Location>
      <RightPanel>
        <Link to={`${user ? '/profile' : '/login'}`}>
          <User />
        </Link>
        <Link to="/mypage">
          <Menu />
        </Link>
      </RightPanel>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: ${colors.primary1};
  border-radius: 0 0 1rem 1rem;
  color: ${colors.white};
`;

const Location = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RightPanel = styled.div`
  display: flex;
  gap: 1rem;
`;
