import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: ReactNode;
  close: () => void;
}

export default function ChatLeaveModal({ children, close }: ModalProps) {
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
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
`;
