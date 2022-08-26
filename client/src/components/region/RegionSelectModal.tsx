import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import COLORS from 'src/constants/colors';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { userState } from 'src/recoil/atoms/user';
import { fixedEntire, flexCenter } from 'src/styles/common';
import styled, { css } from 'styled-components';

interface RegionSelectModalProps {
  isOpen: boolean;
  close: () => void;
}

export default function RegionSelectModal({
  isOpen,
  close,
}: RegionSelectModalProps) {
  const { changePrimaryRegion } = useUserRigionState();
  const user = useRecoilValue(userState);

  return (
    <Modal
      isOpen={isOpen}
      onClick={() => {
        close();
      }}
    >
      <Section>
        {user &&
          user.userRegions.map(({ region }) => (
            <button
              key={region.code}
              onClick={(e) => {
                e.preventDefault();
                changePrimaryRegion(region.code);
                close();
              }}
            >
              {region.name}
            </button>
          ))}
        <Link to="/region">내 동네 설정하기</Link>
      </Section>
    </Modal>
  );
}

const Modal = styled.div<{ isOpen: Boolean }>`
  ${fixedEntire};
  color: ${COLORS.titleActive};
  display: none;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
  padding-top: 3rem;
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
      `;
    }
  }}
`;
const Section = styled.div`
  background: ${COLORS.offWhite};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.titleActive};
  width: 10.32rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 0.6rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);

  button,
  a {
    ${flexCenter};
    height: 3rem;
    border: none;
    background: none;
    padding: 0;
  }

  button {
    border-bottom: 1px solid ${COLORS.grey3};
  }
`;
