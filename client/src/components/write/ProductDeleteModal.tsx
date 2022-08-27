import COLORS from 'src/constants/colors';
import styled from 'styled-components';
import Modal from '../common/Modal';

interface ProductDeleteModalProps {
  content: string;
  close: () => void;
  onClickCheckButton: () => void;
}

export default function ProductDeleteModal({
  content,
  close,
  onClickCheckButton,
}: ProductDeleteModalProps) {
  return (
    <Modal close={close}>
      <Section>
        <h3>{content}</h3>
        <ButtonsContainer>
          <CancelButton onClick={close}>취소</CancelButton>
          <DeleteButton onClick={onClickCheckButton}>확인</DeleteButton>
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

const DeleteButton = styled.button`
  background-color: ${COLORS.error};
  color: ${COLORS.white};
`;
