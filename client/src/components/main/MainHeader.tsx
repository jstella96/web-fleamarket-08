import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Category, Menu, User } from 'src/assets/icons';

import COLORS from 'src/constants/colors';
import { categoryState } from 'src/recoil/atoms/category';

import { userState } from 'src/recoil/atoms/user';
import { fixedTop, flexRow } from 'src/styles/common';
import styled from 'styled-components/macro';
import RegionSelectModal from '../region/RegionSelectModal';
import RegionDropdown from 'src/components/main/RegionDropdown';

export default function Header() {
  const [showRegionSelectModal, setShowRegionSelectModal] = useState(false);
  const user = useRecoilValue(userState);
  const category = useRecoilValue(categoryState);
  const location = useLocation();

  return (
    <Container>
      <CategoryLink to="/category" state={{ backgroundLocation: location }}>
        {category ? (
          <img src={category?.iconUrl} alt={category?.name} />
        ) : (
          <Category />
        )}
        <CategoryName>{category?.name}</CategoryName>
      </CategoryLink>
      <Location>
        <RegionDropdown />
      </Location>
      <RightPanel>
        <Link
          to={`${user ? '/profile' : '/login'}`}
          state={{ backgroundLocation: location }}
        >
          <User />
        </Link>
        <Link to="/mypage">
          <Menu />
        </Link>
      </RightPanel>
      <RegionSelectModal
        isOpen={showRegionSelectModal}
        close={() => {
          setShowRegionSelectModal(false);
        }}
      />
    </Container>
  );
}

const Container = styled.header`
  ${fixedTop};
  ${flexRow};
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0.875rem 1rem;
  background: ${COLORS.primary1};
  border-radius: 0 0 1rem 1rem;
  color: ${COLORS.white};
  z-index: 100;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;

  img {
    width: 1.5rem;
  }
`;

const CategoryName = styled.span`
  font-size: 0.7rem;
  margin-left: 0.3rem;
`;

const RightPanel = styled.div`
  display: flex;
  gap: 1rem;
`;
const Location = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
