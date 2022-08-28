import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { fixedEntire, flexRow } from 'src/styles/common';
import styled, { css } from 'styled-components';

type Variant = 'light' | 'dark';

interface ModalProps {
  children: ReactNode;
  close: () => void;
  variant?: Variant;
}

export default function Modal({ children, close, variant }: ModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).classList.contains('modal-container')) return;
    close();
  };

  return createPortal(
    <ModalContainer
      className="modal-container"
      onClick={handleClick}
      variant={variant}
    >
      {children}
    </ModalContainer>,
    document.body
  );
}

const ModalContainer = styled.div<{ variant?: Variant }>`
  ${fixedEntire};
  ${flexRow};
  align-items: center;
  z-index: 999;
  background: rgba(34, 34, 34, 0.3);

  ${({ variant }) =>
    variant === 'dark' &&
    css`
      background: rgba(34, 34, 34, 0.8);
    `}
`;
