import { Heart } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import styled, { css } from 'styled-components/macro';

import api from 'src/api';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/recoil/atoms/user';
import { useNavigate } from 'react-router-dom';
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
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const handleLikeButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!user) {
      return navigate('/login');
    }
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
