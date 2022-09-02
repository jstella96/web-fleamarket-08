import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from 'src/api';
import { Heart, Message } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { DEFAULT_IMAGE } from 'src/constants/image';
import { ProductStatus } from 'src/enum/status.enum';
import { flexColumn } from 'src/styles/common';
import { productImage } from 'src/styles/productLayouts';
import { Product } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import { getRegionName } from 'src/utils/region';
import styled, { css } from 'styled-components/macro';
import ProductMenuDropdown from '../product/ProductMenuDropdown';
import FormattedPrice from './FormattedPrice';
import LikeButton from './LikeButton';

interface ProductItemProps {
  productItem: Product;
  isSeller: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductItem({
  productItem,
  isSeller,
  setProducts,
}: ProductItemProps) {
  const [product, setProduct] = useState(productItem);
  const {
    id,
    title,
    region,
    createdAt,
    price,
    chatCount,
    thumbnail,
    likeCount,
    status,
    isLiked,
  } = product;

  const handleClickLikeButton = (productId: number) => {
    api.likeProduct(productId);
    setProduct((prev) => {
      const nextLikeCount = likeCount + (isLiked ? -1 : 1);
      return {
        ...prev,
        isLiked: !isLiked,
        likeCount: nextLikeCount,
      };
    });
  };
  const deleteProduct = async () => {
    setProducts((prev) => {
      return prev.filter((product) => product.id !== id);
    });
    await api.deleteProduct(id);
  };
  return (
    <Container to={`/product/${id}`}>
      <ImageContainer>
        {
          <img
            src={thumbnail?.imageUrl || DEFAULT_IMAGE}
            alt={`${title} 썸네일 이미지`}
          />
        }
      </ImageContainer>
      <RightPanel>
        <TitleContainer>
          <Title>{title}</Title>
          <RightButton>
            {isSeller ? (
              <ProductMenuDropdown id={id} deleteProduct={deleteProduct} />
            ) : (
              <LikeButton
                isLiked={isLiked}
                onClick={() => {
                  handleClickLikeButton(id);
                }}
              />
            )}
          </RightButton>
        </TitleContainer>
        <CenterInfo>
          <RegionAndDate>
            <span>{getRegionName(region.name)}</span>
            <span>∙</span>
            <span>{getRelativeTime(createdAt)}</span>
          </RegionAndDate>
          <Price>
            <FormattedPrice price={price} />
          </Price>
        </CenterInfo>
        <CountsContainer>
          <span>
            {status !== ProductStatus.판매중 && (
              <Status status={status}>{status}</Status>
            )}
          </span>
          <span>
            <span>
              <Heart />
              {likeCount}
            </span>
            <span>
              <Message />
              {chatCount}
            </span>
          </span>
        </CountsContainer>
      </RightPanel>
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${COLORS.grey3};
`;

const ImageContainer = styled.div`
  ${productImage}
`;

const RightPanel = styled.div`
  ${flexColumn};
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CenterInfo = styled.div`
  ${flexColumn};
  gap: 0.25rem;
  flex-grow: 1;
  margin-top: 0.125rem;
`;

const Title = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10.5rem;
`;

const RightButton = styled.div`
  display: inline-flex;
  border: 0;
  background: 0;
  color: ${COLORS.grey1};
`;

const RegionAndDate = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;

const Price = styled.p`
  font-size: 0.875rem;
`;
const Status = styled.div<{ status: ProductStatus }>`
  ${({ status }) => {
    if (status === ProductStatus.예약중)
      return css`
        background: ${COLORS.orange};
        color: ${COLORS.offWhite};
      `;
    if (status === ProductStatus.거래완료)
      return css`
        background: ${COLORS.grey3};
        color: ${COLORS.offWhite};
      `;
  }}
  border-radius: 0.315rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.71rem;
`;
const CountsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  color: ${COLORS.grey1};

  span {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    font-size: 0.875rem;
    min-width: 2rem;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;
