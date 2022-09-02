import { useState } from 'react';
import api from 'src/api';
import { ChevronDown } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { ProductStatus } from 'src/enum/status.enum';
import styled, { css } from 'styled-components';
import { Dropdown, DropdownBody, DropdownHeader } from '../common/Dropdown';

interface ProductStatusDropdownProps {
  id: number;
  status: ProductStatus;
}

export default function ProductStatusDropdown({
  id,
  status,
}: ProductStatusDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [nowStatus, setNowStatus] = useState(status);

  return (
    <ProductStatusDropdownContainer
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <Dropdown>
        <DropdownHeader>
          <ProductStatusButton showDropdown={showDropdown}>
            <span>{nowStatus}</span> <ChevronDown />
          </ProductStatusButton>
        </DropdownHeader>
        <DropdownBody width={SIZES.productStatusWidth}>
          {Object.values(ProductStatus).map((status) => (
            <button
              onClick={() => {
                api.updateStatus(id, status);
                setNowStatus(status);
              }}
            >
              {status}
            </button>
          ))}
        </DropdownBody>
      </Dropdown>
    </ProductStatusDropdownContainer>
  );
}
const ProductStatusDropdownContainer = styled.div`
  width: max-content;
`;
const ProductStatusButton = styled.button<{ showDropdown: boolean }>`
  height: 2.5rem;
  border: 1px solid ${COLORS.grey4};
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3125rem;
  width: ${`${SIZES.productStatusWidth}px`};
  font-size: 0.875rem;
  svg {
    width: 1rem;
    height: 1rem;
    color: ${COLORS.grey1};
    transition: all ease 0.25s;
  }
  path {
    stroke-width: 0.25rem;
  }
  ${({ showDropdown }) => {
    if (showDropdown) {
      return css`
        svg {
          transform: rotate(-0.5turn);
        }
      `;
    }
  }}
`;
