import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Category, MapPin, Menu, User } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { categoryState } from 'src/recoil/atoms/category';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Header() {
  const user = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  let location = useLocation();

  return (
    <Container>
      <CategoryLink to="/category" state={{ backgroundLocation: location }}>
        <Category />
        {category && <p>{category.name}</p>}
      </CategoryLink>
      <Location>
        <MapPin /> 장소
      </Location>
      <RightPanel>
        <Link
          to={`${user ? '/profile' : '/login'}`}
          state={{ backgroundLocation: location }}
        >
          <User />
        </Link>
        <Link to="/mypage" state={{ backgroundLocation: location }}>
          <Menu />
        </Link>
      </RightPanel>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1rem;
  background: ${COLORS.primary1};
  border-radius: 0 0 1rem 1rem;
  color: ${COLORS.white};
`;

const Location = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

const RightPanel = styled.div`
  display: flex;
  gap: 1rem;
`;
