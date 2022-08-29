import { useState } from 'react';
import api from 'src/api';
import { ChevronDown } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { ProductStatus } from 'src/enum/status.enum';
import styled, { css } from 'styled-components';
import DropDownModal from '../common/DropDownModal';

interface ProductStatusButtonProps {
  id: number;
  status: ProductStatus;
}

export default function ProductStatusButton({
  id,
  status,
}: ProductStatusButtonProps) {
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [nowStatus, setNowStatus] = useState(status);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleClickMenuButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const clikedButton = (e.target as Element).closest('button');
    if (!clikedButton) return;
    const relativeTop =
      clikedButton.getBoundingClientRect().top + clikedButton.clientHeight;
    const relativeRight = clikedButton.getBoundingClientRect().right;
    setTop(relativeTop);
    setLeft(relativeRight - SIZES.dropDownWidth);
  };

  return (
    <>
      <ProductStatusContainer
        showDropDownModal={showDropDownModal}
        onClick={(e) => {
          handleClickMenuButton(e);
          setShowDropDownModal(true);
        }}
      >
        <span>{nowStatus}</span> <ChevronDown />
      </ProductStatusContainer>
      {showDropDownModal && (
        <DropDownModal
          menu={Object.values(ProductStatus).map((status) => {
            return {
              label: status,
              onClick: () => {
                api.updateStatus(id, status);
                setNowStatus(status);
                setShowDropDownModal(false);
              },
            };
          })}
          close={() => setShowDropDownModal(false)}
          left={left}
          top={top}
          width={SIZES.productStatusWidth}
        ></DropDownModal>
      )}
    </>
  );
}

const ProductStatusContainer = styled.button<{ showDropDownModal: boolean }>`
  height: 2.5rem;
  border: 1px solid ${COLORS.grey4};
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3125rem;
  width: ${SIZES.productStatusWidth};
  svg {
    width: 1rem;
    height: 1rem;
    color: ${COLORS.grey1};
    transition: all ease 0.25s;
  }
  path {
    stroke-width: 0.25rem;
  }
  ${({ showDropDownModal }) => {
    if (showDropDownModal) {
      return css`
        svg {
          transform: rotate(-0.5turn);
        }
      `;
    }
  }}
`;
