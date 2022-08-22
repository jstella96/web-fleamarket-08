import { ReactNode } from 'react';
import SIZES from 'src/constants/sizes';
import styled from 'styled-components/macro';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <Container>
      <Header title={title} />
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: ${SIZES.headerHegight};
`;
