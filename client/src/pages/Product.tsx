import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { Heart, MoreVertical } from 'src/assets/icons';
import Layout from 'src/components/common/Layout';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { userState } from 'src/recoil/atoms/user';
import { ProductDetail } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import styled from 'styled-components/macro';

export default function Product() {
  const user = useRecoilValue(userState);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail>();
  const isSeller = useMemo(
    () => user?.id === product?.author.id,
    [user, product]
  );

  useEffect(() => {
    const initProduct = async () => {
      if (id === undefined) return;
      const { data } = await api.getProduct(Number(id));
      setProduct(data);
    };

    initProduct();
  }, [id]);

  return (
    <Layout
      rightButton={
        isSeller && (
          <Link to="/write">
            <MoreVertical />
          </Link>
        )
      }
      transparent={true}
    >
      {product && (
        <>
          <ImageContainer>
            <img
              src="https://mblogthumb-phinf.pstatic.net/MjAxOTA1MTdfMjg5/MDAxNTU4MDU5MjY3NzI0.La9iCTKSS9Cue6MbMeNSJADSkjSr0VMPlAsIdQYGjoYg.q_VK0tw6okzVQOBJbXGKFFGJkLJUqLVT26CZ9qe29Xcg.PNG.smartbaedal/%ED%97%A4%ED%97%A4%EB%B0%B0%EB%8B%AC%EC%9D%B4_%EC%9E%90%EB%A5%B8%EA%B2%83.png?type=w800"
              alt={`상품 이미지`}
            />
          </ImageContainer>
          <Main>
            <p>{product.status}</p>
            <TitleContainer>
              <Title>{product.title}</Title>
              <ProductInfo>
                <span>{product.category.name}</span>
                <span>∙</span>
                <span>{getRelativeTime(product.createdAt)}</span>
              </ProductInfo>
            </TitleContainer>
            <Content>{product.content}</Content>
            <ProductInfo>
              <span>채팅 {product.chatCount}</span>
              <span>∙</span>
              <span>관심 {product.likeCount}</span>
              <span>∙</span>
              <span>조회 {product.views}</span>
            </ProductInfo>
            <AuthorInfo>
              <p>판매자 정보</p>
              <p>{product.author.name}</p>
              <span>{product.region.name}</span>
            </AuthorInfo>
          </Main>
          <Footer>
            <LikeButton>
              <Heart />
            </LikeButton>
            <p>{Number(product.price).toLocaleString()}원</p>
            {/* <Link to={`${isSeller ? '/chat' : `/chat:${product.id}`}`}> */}
            <ChatButton>{isSeller ? '채팅목록보기' : '문의하기'}</ChatButton>
            {/* </Link> */}
          </Footer>
        </>
      )}
    </Layout>
  );
}

const ImageContainer = styled.div`
  background: ${COLORS.grey3};

  img {
    object-fit: contain;
    width: 100%;
    max-height: ${SIZES.productImage};
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100% - ${SIZES.productImage} - ${SIZES.productFooter});
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: normal;
`;

const ProductInfo = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;

const Content = styled.p`
  flex-grow: 1;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${COLORS.offWhite};

  p:first-child {
    flex-grow: 1;
  }

  p {
    font-weight: 600;
  }

  span {
    font-size: 0.875rem;
    color: ${COLORS.grey1};
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${COLORS.grey3};
  background-color: ${COLORS.white};

  p {
    padding: 0 1rem;
    border-left: 1px solid ${COLORS.grey3};
  }
`;

const LikeButton = styled.button`
  display: flex;
  border: none;
  background: 0;
`;

const ChatButton = styled.button`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${COLORS.primary1};
  color: ${COLORS.white};
`;
