import React from 'react';
import COLORS from 'src/constants/colors';
import styled from 'styled-components';
import Modal from './Modal';

interface AlertProps {
  message: string;
  close: () => void;
}

export default function Alert({ message, close }: AlertProps) {
  return (
    <Modal close={close}>
      <Section>
        <Message>{message}</Message>
        <Button onClick={close}>확인</Button>
      </Section>
    </Modal>
  );
}

const Section = styled.div`
  font-size: 0.875rem;
  padding: 1rem;
  background: ${COLORS.offWhite};
  width: 18rem;
  margin: 0 auto;
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  justify-content: space-between;
`;
const Message = styled.p`
  text-align: center;
  margin: 1.5rem 0;
`;
const Button = styled.button`
  border: none;
  background: ${COLORS.primary1};
  padding: 0.5rem;
  border-radius: 0.6rem;
  color: ${COLORS.white};
  margin-bottom: 0.2rem;
`;
