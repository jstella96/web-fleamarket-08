import { Heart } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import styled, { css } from 'styled-components/macro';

import { useState } from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

export default function LikeButton({ isLiked, onClick }: LikeButtonProps) {
  const [isActive, setIsActive] = useState(isLiked);

  const handleLikeButtonClick = () => {
    setIsActive((prev) => !prev);
    onClick();
  };

  return (
    <Container
      isActive={isActive}
      onClick={(e) => {
        e.preventDefault();
        handleLikeButtonClick();
      }}
    >
      <Heart></Heart>
    </Container>
  );
}

const Container = styled.button<{
  isActive: Boolean;
}>`
  ${({ isActive }) => {
    if (isActive) {
      return css`
        svg {
          color: ${COLORS.primary1};
          fill: ${COLORS.primary1};
        }
      `;
    }
  }}
`;
