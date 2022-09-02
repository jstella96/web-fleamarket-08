import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import COLORS from 'src/constants/colors';
import { fixedEntire, flexRow } from 'src/styles/common';
import styled, { css } from 'styled-components';
import { createPortal } from 'react-dom';
import SIZES from 'src/constants/sizes';

interface DropdownState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

interface DropdownHeaderProps {
  children?: React.ReactNode;
}

interface DropdownBodyProps {
  children?: React.ReactNode;
  width?: number;
}

interface Position {
  top: number;
  right: number;
  left: number;
}
const DropdownContext = createContext<DropdownState | null>(null);
DropdownContext.displayName = 'DropdownContext';

const useDropdownContext = () => useContext(DropdownContext);

export function Dropdown({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: 0,
    right: 0,
    left: 0,
  });

  const value = {
    isOpen,
    setIsOpen,
    position,
    setPosition,
  };

  return (
    <DropdownContext.Provider value={value}>
      <Wrapper>{children}</Wrapper>
    </DropdownContext.Provider>
  );
}

export function DropdownHeader({ children }: DropdownHeaderProps) {
  const { isOpen, setIsOpen, setPosition } = useDropdownContext()!;
  const headerRef = useRef<HTMLDivElement | null>(null);

  const calculatePosition = () => {
    if (!headerRef.current) return;
    const dropdownHeader = headerRef.current;
    const relativeTop =
      dropdownHeader.getBoundingClientRect().top + dropdownHeader.clientHeight;
    const relativeRight = dropdownHeader.getBoundingClientRect().right;
    const relativeLeft = dropdownHeader.getBoundingClientRect().left;
    setPosition({ top: relativeTop, right: relativeRight, left: relativeLeft });
  };

  return (
    <HeaderWrapper
      ref={headerRef}
      onClick={() => {
        calculatePosition();
        setIsOpen(!isOpen);
      }}
    >
      {children}
    </HeaderWrapper>
  );
}

export function DropdownBody({ children, width }: DropdownBodyProps) {
  const { isOpen, position, setIsOpen } = useDropdownContext()!;

  return createPortal(
    <BodyWrapper
      isOpen={isOpen}
      className="dropdown-body"
      onClick={() => setIsOpen(false)}
    >
      <ItemList
        top={position.top}
        left={
          width
            ? position.right - width
            : position.left -
              (SIZES.dropDownWidth - (position.right - position.left)) / 2
        }
        width={width}
      >
        {children}
      </ItemList>
    </BodyWrapper>,
    document.body
  );
}

const Wrapper = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`;

const BodyWrapper = styled.div<{ isOpen: Boolean }>`
  ${fixedEntire};
  ${flexRow};
  z-index: 999;
  background: rgba(34, 34, 34, 0.3);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ItemList = styled.div<{
  top: number;
  left: number;
  width?: number;
}>`
  height: max-content;
  color: ${COLORS.titleActive};
  background-color: ${COLORS.white};
  border-radius: 0.315rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  position: fixed;
  margin-top: 0.2rem;
  font-size: 0.875rem;
  font-weight: 500;
  ${({ top, left, width }) => {
    return css`
      width: ${`${width ? width : SIZES.dropDownWidth}px`};
      top: ${`${top}px`};
      left: ${`${left}px`};
    `;
  }}
  button, a {
    text-align: center;
    display: inline-block;
    width: 100%;
    padding: 1rem 1em;
    border-bottom: 1px solid ${COLORS.grey3};
    &:nth-last-child(1) {
      border: none;
    }
  }
`;
