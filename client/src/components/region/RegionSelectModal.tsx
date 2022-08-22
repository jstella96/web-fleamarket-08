import { Link } from 'react-router-dom';
import colors from 'src/constants/colors';
import styled from 'styled-components';

interface RegionSelectModalProps {
  isOpen: boolean;
  close: any;
}

export default function RegionSelectModal({
  isOpen,
  close,
}: RegionSelectModalProps) {
  const closeModal = () => {
    close();
  };
  return (
    <Modal className={isOpen ? 'openModal modal' : 'modal'}>
      <Section>
        <button onClick={closeModal}>역삼동</button>
        <Link to="/region">
          <button onClick={closeModal}>내 동네 설정하기</button>
        </Link>
      </Section>
    </Modal>
  );
}
const Modal = styled.div`
  color: ${colors.titleActive};
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding-top: 3rem;
  &.openModal {
    display: flex;
  }
`;
const Section = styled.div`
  background: ${colors.offWhite};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.titleActive};
  width: 10.32rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 0.6rem;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  button {
    height: 3rem;
    border: none;
    background: none;
    padding: 0;
    border-bottom: 1px solid ${colors.grey3};
  }
`;
