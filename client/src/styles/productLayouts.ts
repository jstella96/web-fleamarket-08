import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { css } from 'styled-components/macro';
import { flexColumn, flexRow } from './common';

export const ProductContainer = css`
  ${flexRow};
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${COLORS.grey3};
`;

export const productImage = css`
  ${flexRow};
  width: 7rem;
  min-width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 1rem;
  background: ${COLORS.grey3};
  margin-right: 1rem;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const RightPanelContainer = css`
  ${flexColumn};
  gap: 0.375rem;
  min-height: calc(100% - ${SIZES.productImage} - ${SIZES.productFooter});
`;
