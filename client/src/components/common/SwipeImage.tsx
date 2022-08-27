import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';

SwiperCore.use([Navigation, Pagination]);

interface SwipeImageProps {
  imageUrls: string[];
}

export default function SwipeImage({ imageUrls }: SwipeImageProps) {
  return (
    <SwiperStyle scrollbar slidesPerView={1} pagination>
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <Image imageUrl={imageUrl} />
        </SwiperSlide>
      ))}
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
  background-size: 100% 100%;
`;

const SwiperStyle = styled(Swiper)`
  height: ${SIZES.productImage};
  .swiper-pagination-bullet-active {
    color: ${COLORS.offWhite};
    background: ${COLORS.offWhite};
  }
`;
