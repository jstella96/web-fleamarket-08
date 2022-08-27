import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Message } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { DEFAULT_IMAGE } from 'src/constants/image';
import { flexColumn } from 'src/styles/common';
import { productImage } from 'src/styles/productLayouts';
import { Product } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import styled from 'styled-components/macro';
import FormattedPrice from './FormattedPrice';

interface ProductItemProps {
  product: Product;
  rightButton?: ReactNode;
}

export default function ProductItem({
  product,
  rightButton,
}: ProductItemProps) {
  const {
    id,
    title,
    region,
    createdAt,
    price,
    chatCount,
    thumbnail,
    likeCount,
  } = product;
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
          <RightButton>{rightButton}</RightButton>
        </TitleContainer>
        <CenterInfo>
          <RegionAndDate>
            <span>{region.name}</span>
            <span>∙</span>
            <span>{getRelativeTime(createdAt)}</span>
          </RegionAndDate>
          <Price>
            <FormattedPrice price={price} />
          </Price>
        </CenterInfo>
        <CountsContainer>
          <span>
            <Heart />
            {likeCount}
          </span>
          <span>
            <Message />
            {chatCount}
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

  button {
    display: flex;
    padding: 0;
  }
`;

const RegionAndDate = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;

const Price = styled.p`
  font-size: 0.875rem;
`;

const CountsContainer = styled.div`
  display: flex;
  justify-content: end;
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
