import React from 'react';
import COLORS from 'src/constants/colors';
import { fixedEntire, flexRow } from 'src/styles/common';
import styled, { css } from 'styled-components';

interface Menu {
  label: string;
  onClick: () => void;
}

interface DropDownProps {
  menu: Menu[];
  close: () => void;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: string;
}

export default function DropDownModal({
  menu,
  close,
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  width = '8rem',
}: DropDownProps) {
  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).className.includes('dropdown-container')) return;
    close();
  };

  return (
    <DropDownContainer
      className="dropdown-container"
      onClick={handleClickContainer}
    >
      <DropDownContent
        width={width}
        top={top}
        bottom={bottom}
        right={right}
        left={left}
      >
        {menu.map((menuItem, index) => (
          <DropDownMenu key={index} onClick={menuItem.onClick}>
            {menuItem.label}
          </DropDownMenu>
        ))}
      </DropDownContent>
    </DropDownContainer>
  );
}

const DropDownMenu = styled.button`
  text-align: center;
  display: inline-block;
  width: 100%;
  padding: 1rem 1em;
  border-bottom: 1px solid ${COLORS.grey3};
`;
const DropDownContainer = styled.div`
  ${fixedEntire};
  ${flexRow};
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
`;

const DropDownContent = styled.div<{
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: string;
}>`
  position: fixed;
  height: max-content;
  color: ${COLORS.titleActive};
  background-color: ${COLORS.white};
  border-radius: 0.315rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  ${({ width }) => {
    return css`
      width: ${width};
    `;
  }}
  ${({ top, bottom }) => {
    if (top === 0 && bottom === 0) {
      return css`
        top: 0;
      `;
    } else {
      return css`
        top: ${`${top}px`};
        bottom: ${`${bottom}px`};
      `;
    }
  }}
  ${({ left, right }) => {
    if (left === 0 && right === 0) {
      return css`
        right: 0;
      `;
    } else {
      return css`
        left: ${`${left}px`};
        right: ${`${right}px`};
      `;
    }
  }}
`;
