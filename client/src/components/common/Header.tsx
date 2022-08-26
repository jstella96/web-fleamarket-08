import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { absoluteCenter, fixedTop } from 'src/styles/common';
import styled from 'styled-components/macro';

interface HeaderProps {
  title?: string;
  rightButton?: ReactNode;
  transparent?: boolean;
}

export default function Header({
  title,
  rightButton,
  transparent,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <Container transparent={transparent}>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft />
      </BackButton>
      <Title>{title}</Title>
      {rightButton}
    </Container>
  );
}

const Container = styled.header<{ transparent?: boolean }>`
  z-index: 100;
  ${fixedTop};
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ transparent }) => !transparent && COLORS.white};
  border-bottom: ${({ transparent }) =>
    !transparent && `1px solid ${COLORS.grey3}`};
  color: ${({ transparent }) => transparent && COLORS.white};
`;

const BackButton = styled.button`
  background: none;
  border: 0;
`;

const Title = styled.h1`
  ${absoluteCenter};
  font-size: 1rem;
`;
