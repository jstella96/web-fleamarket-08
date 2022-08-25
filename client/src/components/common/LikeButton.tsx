import { Heart } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import styled, { css } from 'styled-components/macro';
import api from 'src/api';
interface LikeButtonProps {
  productId: number;
  isLike: boolean;
  onClick: () => void;
}

export default function LikeButton({
  productId,
  isLike,
  onClick,
}: LikeButtonProps) {
  const handleLikeButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    api.likeProduct(productId);
    onClick();
  };

  return (
    <Container isLike={isLike} onClick={handleLikeButtonClick}>
      <Heart></Heart>
    </Container>
  );
}

const Container = styled.button<{
  isLike: Boolean;
}>`
  ${({ isLike }) => {
    if (isLike) {
      return css`
        svg {
          color: ${COLORS.primary1};
          fill: ${COLORS.primary1};
        }
      `;
    }
  }}
`;
