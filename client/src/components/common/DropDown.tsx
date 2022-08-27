import React, { ReactNode } from 'react';
import COLORS from 'src/constants/colors';
import { fixedEntire, flexRow } from 'src/styles/common';
import styled from 'styled-components';

interface DropDownProps {
  children: ReactNode;
  close: () => void;
}

export default function DropDown({ children, close }: DropDownProps) {
  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).className.includes('dropdown-container')) return;
    close();
  };

  return (
    <DropDownContainer
      className="dropdown-container"
      onClick={handleClickContainer}
    >
      <DropDownContent>{children}</DropDownContent>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  ${fixedEntire};
  ${flexRow};
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
`;

const DropDownContent = styled.div`
  min-width: 5rem;
  position: fixed;
  top: 0;
  right: 0;
  height: fit-content;
  color: ${COLORS.titleActive};
  background-color: ${COLORS.white};
  border-radius: 0.2rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
`;
