import styled from 'styled-components/macro';

interface ProductImageProps {
  src: string;
}

export default function ProductImage({ src }: ProductImageProps) {
  return (
    <Container>
      <img src={src} alt="상품 이미지" />
    </Container>
  );
}

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
