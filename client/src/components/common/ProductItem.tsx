import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Message } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { DEFAULT_IMAGE } from 'src/constants/image';
import { Product } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import styled from 'styled-components/macro';

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
        <RegionAndDate>
          <span>{region.name}</span>
          <span>∙</span>
          <span>{getRelativeTime(createdAt)}</span>
        </RegionAndDate>
        <p>{Number(price).toLocaleString()}원</p>
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
`;

const ImageContainer = styled.div`
  display: flex;
  width: 9rem;
  min-width: 9rem;
  height: 9rem;
  overflow: hidden;
  border-radius: 1rem;
  background: ${COLORS.grey3};
  margin-right: 1rem;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10.5rem;
  font-size: 1.25rem;
`;

const RightButton = styled.div`
  display: inline-flex;
  border: 0;
  background: 0;
  color: ${COLORS.grey1};
`;

const RegionAndDate = styled.p`
  color: ${COLORS.grey1};
`;

const CountsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.25rem;
  color: ${COLORS.grey1};

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;
