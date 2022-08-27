import { Heart } from 'src/assets/icons';
import { flexRow } from 'src/styles/common';
import styled from 'styled-components/macro';

interface PriceProps {
  price: string;
}

export default function FormattedPrice({ price }: PriceProps) {
  const priceNum = Number(price);

  return (
    <Container>
      {priceNum === 0 ? (
        <span>
          나눔
          <Heart />
        </span>
      ) : (
        `${Number(price).toLocaleString()}원`
      )}
    </Container>
  );
}

const Container = styled.span`
  svg {
    fill: red;
    color: red;
    width: 1.25rem;
    height: 1.25rem;
  }

  span {
    ${flexRow};
    gap: 0.125rem;
    align-items: center;
  }
`;
