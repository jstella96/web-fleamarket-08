import COLORS from 'src/constants/colors';
import styled from 'styled-components';
import Modal from './Modal';
interface ConfirmModalProps {
  message: string;
  close: () => void;
  onClickConfirmButton: () => void;
}

export default function ConfirmModal({
  message,
  close,
  onClickConfirmButton,
}: ConfirmModalProps) {
  return (
    <Modal close={close}>
      <Section>
        <h3>{message}</h3>
        <ButtonsContainer>
          <CancelButton onClick={close}>취소</CancelButton>
          <ConfirmButton onClick={onClickConfirmButton}>확인</ConfirmButton>
        </ButtonsContainer>
      </Section>
    </Modal>
  );
}

const Section = styled.section`
  font-size: 0.875rem;
  padding: 1rem;
  background: ${COLORS.offWhite};
  width: 18rem;
  margin: 0 auto;
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.6rem;
  text-align: center;

  button {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CancelButton = styled.button`
  border: 1px solid ${COLORS.grey1};
`;

const ConfirmButton = styled.button`
  background-color: ${COLORS.error};
  color: ${COLORS.white};
`;
