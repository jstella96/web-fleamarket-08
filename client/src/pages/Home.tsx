import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { Add } from 'src/assets/icons';
import MainHeader from 'src/components/main/MainHeader';
import ProductItem from 'src/components/ProductItem';
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
          <button
            onClick={async () => {
              try {
                await api.setUserRegion(1);
              } catch (err) {}
              await api.createProduct({
                title: 'string',
                price: 0,
                content: 'string',
                imageUrls: ['string'],
                categoryId: 1,
              });
            }}
          >
            (임시) 유저 초기 설정(동네 등록, 상품 하나 추가)
          </button>
        </>
      )}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <Link to="/write">
        <Add />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: ${SIZES.mainHeaderHeight};
`;
