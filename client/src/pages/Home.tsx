import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { Add } from 'src/assets/icons';
import ProductItemWrapper from 'src/components/common/ProductItemWrapper';
import MainHeader from 'src/components/main/MainHeader';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Home() {
  const user = useRecoilValue(userState);

  const sessionTest = () => {
    api.socialLoginTest();
  };

  return (
    <Container>
      <MainHeader />
      <button onClick={sessionTest}>test</button>
      {user && (
        <>
          <p>현재 로그인한 유저: {user.name}</p>
        </>
      )}
      <ProductItemWrapper />
      <WriteLink to="/write">
        <Add />
      </WriteLink>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: ${SIZES.mainHeaderHeight};
`;

const WriteLink = styled(Link)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  padding: 1rem;
  border-radius: 100%;
  background-color: ${COLORS.primary1};
  color: ${COLORS.white};
`;
