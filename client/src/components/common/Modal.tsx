import React, { ReactNode } from 'react';
import { fixedEntire, flexRow } from 'src/styles/common';
import styled from 'styled-components';

interface ModalProps {
  children: ReactNode;
  close: () => void;
}

export default function Modal({ children, close }: ModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).className.includes('modal-container')) return;
    close();
  };

  return (
    <ModalContainer className="modal-container" onClick={handleClick}>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  ${fixedEntire};
  ${flexRow};
  align-items: center;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
`;
