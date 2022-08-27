import COLORS from 'src/constants/colors';
import { Category } from 'src/types';
import styled, { css } from 'styled-components';
import Modal from '../common/Modal';

interface RegionInputModalProps {
  categories: Category[];
  selectedCategoryId?: number;
  close: () => void;
  selectCategory: (arg0: Category) => void;
}

export default function CategoryModal({
  categories,
  selectedCategoryId,
  close,
  selectCategory,
}: RegionInputModalProps) {
  return (
    <Modal close={close}>
      <CategoryWrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            onClick={() => {
              selectCategory(category);
              close();
            }}
            checked={category.id === selectedCategoryId}
          >
            <button>{category.name}</button>
          </CategoryItem>
        ))}
      </CategoryWrapper>
    </Modal>
  );
}

const CategoryWrapper = styled.ul`
  font-size: 0.875rem;
  padding: 1rem;
  background: ${COLORS.offWhite};
  max-height: 70%;
  overflow-y: auto;
  width: 20rem;
  margin: 0 auto;
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  justify-content: space-between;
`;
const CategoryItem = styled.li<{
  checked: boolean;
}>`
  padding: 1.3rem 0rem;
  border-bottom: 1px solid ${COLORS.grey3};
  ${({ checked }) => {
    if (checked)
      return css`
        background: ${COLORS.grey2};
      `;
  }}
`;
