import { ReactNode } from 'react';
import COLORS from 'src/constants/colors';
import styled from 'styled-components/macro';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return <Container onClick={onClick}>{children}</Container>;
}

const Container = styled.button`
  min-height: 3rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  background-color: ${COLORS.primary1};
  color: ${COLORS.white};
`;
