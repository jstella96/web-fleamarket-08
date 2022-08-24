import { useState } from 'react';
import { Send } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import styled from 'styled-components/macro';

interface ChatFormProps {
  onSubmit: (chatInput: string) => Promise<void>;
}

export default function ChatForm({ onSubmit }: ChatFormProps) {
  const [content, setContent] = useState('');

  return (
    <Container
      onSubmit={async (event) => {
        event.preventDefault();
        if (!content) return;

        await onSubmit(content);
        setContent('');
      }}
    >
      <input
        placeholder="메시지를 입력하세요."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit" aria-label="채팅 입력" disabled={!content}>
        <Send />
      </button>
    </Container>
  );
}

const Container = styled.form`
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 0.5rem;
  border-top: 1px solid ${COLORS.grey3};
  background-color: ${COLORS.white};

  input {
    flex-grow: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid ${COLORS.grey3};
  }

  button {
    display: flex;
    align-items: center;
    color: ${COLORS.titleActive};

    &:disabled {
      color: ${COLORS.grey1};
    }
  }
`;
