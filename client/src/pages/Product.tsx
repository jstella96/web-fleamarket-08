import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import FormattedPrice from 'src/components/common/FormattedPrice';
import Layout from 'src/components/common/Layout';
import LikeButton from 'src/components/common/LikeButton';
import SwipeImage from 'src/components/common/SwipeImage';
import ProductMenuButton from 'src/components/product/ProductMenuButton';
import ProductStateButton from 'src/components/product/ProductStatusButton';
import COLORS from 'src/constants/colors';
import { DEFAULT_IMAGE } from 'src/constants/image';
import SIZES from 'src/constants/sizes';
import { ProductStatus } from 'src/enum/status.enum';
import { userState } from 'src/recoil/atoms/user';
import { fixedBottom, flexColumn, flexRow } from 'src/styles/common';
import { ProductDetail } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import { getRegionName } from 'src/utils/region';
import styled, { css } from 'styled-components/macro';

export default function Product() {
  const user = useRecoilValue(userState);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail>();
  const isSeller = useMemo(
    () => user?.id === product?.author.id,
    [user, product]
  );

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const initProduct = async () => {
      if (id === undefined) return;
      const { data } = await api.getProduct(Number(id));
      setProduct(data);
    };
    initProduct();
  }, [id]);

  const deleteProduct = async () => {
    if (!id) return;
    await api.deleteProduct(+id);
    navigate('/');
  };

  return (
    <Layout
      rightButton={
        isSeller && (
          <ProductMenuButton id={+id!} deleteProduct={deleteProduct} />
        )
      }
      transparent={true}
    >
      {product && (
        <Container>
          <ImageContainer>
            {product.images.length > 0 ? (
              <SwipeImage
                imageUrls={product.images.map((image) => image.imageUrl)}
              />
            ) : (
              <img src={DEFAULT_IMAGE} alt={`상품 기본 이미지`} />
            )}
          </ImageContainer>
          <Main>
            {isSeller && (
              <ProductStateButton status={product.status} id={product.id} />
            )}
            <TitleContainer>
              <TitleText>
                {!isSeller && product.status !== ProductStatus.판매중 && (
                  <TitleLabel status={product.status}>
                    {product.status}
                  </TitleLabel>
                )}
                <Title>{product.title}</Title>
              </TitleText>
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
              <span>{getRegionName(product.region.name)}</span>
            </AuthorInfo>
          </Main>
          <Footer>
            <LikeButtonContainer>
              <LikeButton
                isLiked={product.isLiked}
                onClick={() => {
                  api.likeProduct(product.id);
                }}
              />
            </LikeButtonContainer>
            <p>
              <FormattedPrice price={product.price} />
            </p>
            <ChatLink
              to={`${
                isSeller ? `/chat/${product.id}` : `/chat-detail/${product.id}`
              }`}
            >
              {isSeller ? '채팅목록보기' : '문의하기'}
            </ChatLink>
          </Footer>
        </Container>
      )}
    </Layout>
  );
}

const Container = styled.div`
  padding-bottom: ${SIZES.productFooter};
`;

const TitleText = styled.h2`
  display: flex;
  font-size: 1.3rem;
  font-weight: normal;
  gap: 0.3rem;
`;
const TitleLabel = styled.div<{ status: ProductStatus }>`
  ${({ status }) => {
    if (status === ProductStatus.예약중)
      return css`
        color: ${COLORS.orange};
      `;
    if (status === ProductStatus.거래완료)
      return css`
        color: ${COLORS.grey3};
      `;
  }}
`;
const Title = styled.div``;

const ImageContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0) 16.52%,
    rgba(0, 0, 0, 0) 87.36%,
    rgba(0, 0, 0, 0.24) 100%
  );

  img {
    width: 100%;
  }
`;

const Main = styled.div`
  ${flexColumn};
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - ${SIZES.productImage} - ${SIZES.productFooter});
`;

const TitleContainer = styled.div`
  ${flexColumn};
  gap: 0.5rem;
`;

const ProductInfo = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;

const Content = styled.p`
  flex-grow: 1;
`;

const AuthorInfo = styled.div`
  ${flexRow};
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
  ${fixedBottom};
  ${flexRow};
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

const LikeButtonContainer = styled.div`
  ${flexRow}
  border: none;
  background: 0;
`;

const ChatLink = styled(Link)`
  ${flexRow};
  justify-content: center;
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${COLORS.primary1};
  color: ${COLORS.white};
`;
