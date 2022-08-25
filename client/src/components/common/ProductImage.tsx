import COLORS from 'src/constants/colors';
import { DEFAULT_IMAGE } from 'src/constants/image';
import styled from 'styled-components/macro';

interface ProductImageProps {
  src: string;
}

export default function ProductImage({ src }: ProductImageProps) {
  return (
    <Container>
      <img src={src || DEFAULT_IMAGE} alt="상품 이미지" />
    </Container>
  );
}

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border-radius: 1rem;
  background: ${COLORS.grey3};

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
