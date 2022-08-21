import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'src/assets/icons';
import colors from 'src/constants/colors';
import styled from 'styled-components/macro';

interface HeaderProps {
  title: string;
  rightButton?: ReactNode;
}

export default function Header({ title, rightButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft />
      </BackButton>
      <Title>{title}</Title>
      {rightButton}
    </Container>
  );
}

const Container = styled.header`
  position: relative;
  display: flex;
  padding: 0.75rem;
  background-color: ${colors.offWhite};
  border-bottom: 1px solid ${colors.grey3};
`;

const BackButton = styled.button`
  background: none;
  border: 0;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
`;
