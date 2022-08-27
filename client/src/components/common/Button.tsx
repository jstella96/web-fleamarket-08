import { ReactNode } from 'react';
import COLORS from 'src/constants/colors';
import styled, { css } from 'styled-components/macro';

type Variant = 'primary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: Variant;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <Container onClick={onClick} variant={variant}>
      {children}
    </Container>
  );
}

const Container = styled.button<{ variant: Variant }>`
  padding: 0.75rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 0;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${COLORS.primary1};
          color: ${COLORS.white};
        `;
      case 'outline':
        return css`
          border: 1px solid ${COLORS.grey1};
        `;
    }
  }}
`;
