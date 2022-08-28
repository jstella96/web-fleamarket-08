import { useState } from 'react';
import { Close } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import Modal from './Modal';

SwiperCore.use([Navigation, Pagination]);

interface SwipeImageProps {
  imageUrls: string[];
}

export default function SwipeImage({ imageUrls }: SwipeImageProps) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();

  return (
    <SwiperStyle scrollbar slidesPerView={1} pagination>
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <Image
            imageUrl={imageUrl}
            onClick={() => setSelectedImageUrl(imageUrl)}
          />
        </SwiperSlide>
      ))}
      {selectedImageUrl && (
        <Modal close={() => setSelectedImageUrl('')} variant="dark">
          <ImageContainer>
            <CloseButton onClick={() => setSelectedImageUrl('')}>
              <Close />
            </CloseButton>
            <img src={selectedImageUrl} alt="상품 사진" />
          </ImageContainer>
        </Modal>
      )}
    </SwiperStyle>
  );
}

const Image = styled.div<{
  imageUrl: string;
}>`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.24) 0%,
      rgba(0, 0, 0, 0) 16.52%,
      rgba(0, 0, 0, 0) 87.36%,
      rgba(0, 0, 0, 0.24) 100%
    ),
    url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
`;

const SwiperStyle = styled(Swiper)`
  height: ${SIZES.productImage};
  .swiper-pagination-bullet-active {
    color: ${COLORS.offWhite};
    background: ${COLORS.offWhite};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${COLORS.white};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 100%;
  }
`;
