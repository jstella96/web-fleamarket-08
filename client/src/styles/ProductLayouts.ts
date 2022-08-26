import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { css } from 'styled-components/macro';

export const ProductContainer = css`
  display: flex;
  width: 100%;
  padding: 1rem;
`;

export const ImageContainer = css`
  display: flex;
  width: 9rem;
  min-width: 9rem;
  height: 9rem;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100% - ${SIZES.productImage} - ${SIZES.productFooter});
`;
