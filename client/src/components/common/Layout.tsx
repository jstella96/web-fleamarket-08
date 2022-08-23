import { ReactNode } from 'react';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import styled from 'styled-components/macro';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  rightButton?: ReactNode;
  transparent?: boolean;
}

export default function Layout({
  children,
  title,
  rightButton,
  transparent,
}: LayoutProps) {
  return (
    <Container transparent={transparent}>
      <Header
        title={title}
        rightButton={rightButton}
        transparent={transparent}
      />
      {children}
    </Container>
  );
}

const Container = styled.div<{ transparent?: boolean }>`
  position: relative;
  height: 100vh;
  padding-top: ${({ transparent }) => !transparent && SIZES.headerHegight};
  background: ${COLORS.white};
`;
