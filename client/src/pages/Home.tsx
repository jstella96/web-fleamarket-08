import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { Add } from 'src/assets/icons';
import MainHeader from 'src/components/main/MainHeader';
import ProductItem from 'src/components/ProductItem';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { userState } from 'src/recoil/atoms/user';
import { Product } from 'src/types';
import styled from 'styled-components/macro';

export default function Home() {
  const user = useRecoilValue(userState);

  const [products, setProduts] = useState<Product[]>([]);

  useEffect(() => {
    const initProducts = async () => {
      const { data } = await api.getProducts();
      setProduts(data);
    };

    initProducts();
  }, []);

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
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
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
