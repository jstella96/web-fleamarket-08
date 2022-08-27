import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from 'src/recoil/atoms/user';
import { absoluteBottom, flexColumn } from 'src/styles/common';
import styled from 'styled-components/macro';
import Button from '../common/Button';
import RegionSelect from '../region/RegionSelect';

export default function EmptyRegion() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!user.userRegions.length) navigate('/', { replace: true });
  }, [navigate, user]);

  if (user?.userRegions?.length) return <>{<Outlet />}</>;
  return (
    <Container>
      <h2>내 동네 선택</h2>
      <RegionSelect />
      <ButtonContainer>
        <Button variant="outline" onClick={() => setUser(null)}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 2rem;
  ${flexColumn};
  text-align: center;
`;

const ButtonContainer = styled.div`
  ${absoluteBottom};
  width: 100%;
  padding: 2rem;
`;
