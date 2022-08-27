import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { Product } from 'src/types';
import styled from 'styled-components/macro';
import FormattedPrice from '../common/FormattedPrice';
import ProductImage from '../common/ProductImage';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { thumbnail, title, price, status } = product;

  return (
    <Container>
      <LeftPanel>
        <ProductImage src={thumbnail?.imageUrl} />
        <div>
          <p>{title}</p>
          <Price>
            <FormattedPrice price={price} />
          </Price>
        </div>
      </LeftPanel>
      <Status>{status}</Status>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: ${SIZES.headerHegight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${COLORS.grey3};
  background: ${COLORS.white};
`;

const LeftPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Price = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;

const Status = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${COLORS.grey3};
`;
