import styled, { css } from 'styled-components/macro';

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const fixedTop = css`
  position: fixed;
  top: 0;
`;

export const fixedBottom = css`
  position: fixed;
  bottom: 0;
`;

export const fixedEntire = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const absoluteTop = css`
  position: absolute;
  top: 0;
`;

export const absoluteBottom = css`
  position: absolute;
  bottom: 0;
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FlexboxRow = styled.div`
  ${flexRow};
`;

export const FlexboxColumn = styled.div`
  ${flexColumn}
`;
