import { Link } from 'react-router-dom';
import { Add } from 'src/assets/icons';
import ProductItemList from 'src/components/common/ProductItemList';
import MainHeader from 'src/components/main/MainHeader';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import styled from 'styled-components/macro';

export default function Home() {
  return (
    <Container>
      <MainHeader />
      <ProductItemList />
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
