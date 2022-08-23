import React from 'react';
import COLORS from 'src/constants/colors';
import styled from 'styled-components';

interface AlertProps {
  message: string;
  close: () => void;
}

//타입주기, 디자인 css
export default function Alert({ message, close }: AlertProps) {
  return (
    <Modal>
      <Section>
        <Message>{message}</Message>
        <Button onClick={close}>확인</Button>
      </Section>
    </Modal>
  );
}

const Modal = styled.div`
  color: ${COLORS.titleActive};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);
  display: flex;
  align-items: center;
`;
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
