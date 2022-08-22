import colors from 'src/constants/colors';
import styled, { css } from 'styled-components';

interface RegionInputModalProps {
  isOpen: boolean;
  close: () => void;
}

export default function RegionInputModal({
  isOpen,
  close,
}: RegionInputModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <Section>
        <p>우리동네를 입력하세요</p>
        <input placeholder="시.구 제외, 동만 입력"></input>
        <footer>
          <button onClick={() => close()}>취소</button>
          <button onClick={() => close()}>확인</button>
        </footer>
      </Section>
    </Modal>
  );
}
const Modal = styled.div<{ isOpen: Boolean }>`
  color: ${colors.titleActive};
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
        align-items: center;
      `;
    }
  }}
`;
const Section = styled.div`
  font-size: 0.875rem;
  padding: 1rem;
  background: ${colors.offWhite};
  width: 18rem;
  height: 8.25rem;
  margin: 0 auto;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  justify-content: space-between;
  p {
    padding: 0 0.25rem;
  }
  input {
    width: 100%;
    color: ${colors.titleActive};
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 1px solid ${colors.grey3};
  }
  footer {
    padding: 0 0.25rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      border: none;
      background: none;
      padding: 0;
    }
    button:nth-child(1) {
      color: ${colors.titleActive};
    }
    button:nth-child(2) {
      color: ${colors.grey1};
    }
  }
`;
