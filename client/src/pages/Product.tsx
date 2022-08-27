import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { Heart } from 'src/assets/icons';
import ConfirmModal from 'src/components/common/ConfirmModal';
import FormattedPrice from 'src/components/common/FormattedPrice';
import Layout from 'src/components/common/Layout';
import SwipeImage from 'src/components/common/SwipeImage';
import ProductHeaderButton from 'src/components/product/ProductHeaderButton';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { userState } from 'src/recoil/atoms/user';
import { fixedBottom, flexColumn, flexRow } from 'src/styles/common';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
          <ProductHeaderButton
            id={id}
            deleteProduct={() => setShowDeleteConfirm(true)}
          />
        )
      }
      transparent={true}
    >
      {product && (
        <>
          <ImageContainer>
            <SwipeImage
              imageUrls={product.images.map((image) => image.imageUrl)}
            ></SwipeImage>
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
            <p>
              <FormattedPrice price={product.price} />
            </p>
            <ChatLink
              to={`${
                isSeller ? `/chat/${product.id}` : `/chat-detail/${product.id}`
              }`}
              state={location}
            >
              {isSeller ? '채팅목록보기' : '문의하기'}
            </ChatLink>
          </Footer>
        </>
      )}
      {showDeleteConfirm && (
        <ConfirmModal
          message="포스팅을 삭제하시겠습니까?"
          close={() => {
            setShowDeleteConfirm(false);
          }}
          onClickConfirmButton={() => {
            deleteProduct();
          }}
        ></ConfirmModal>
      )}
    </Layout>
  );
}

const ImageContainer = styled.div`
  background: ${COLORS.grey3};
`;

const Main = styled.div`
  ${flexColumn};
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100% - ${SIZES.productImage} - ${SIZES.productFooter});
`;

const TitleContainer = styled.div`
  ${flexColumn};
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

const LikeButton = styled.button`
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
