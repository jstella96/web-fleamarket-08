import COLORS from 'src/constants/colors';
import { ChatContent as ChatContentType } from 'src/types';
import styled, { css } from 'styled-components/macro';

interface ChatContentProps {
  content: ChatContentType;
  isMe?: boolean;
}

export default function ChatContent({ content, isMe }: ChatContentProps) {
  return (
    <Container isMe={isMe}>
      <UserContainer>
        {!isMe && <UserName>{content.user.name}</UserName>}
        <Content isMe={isMe}>{content.content}</Content>
      </UserContainer>
      <ContentDate>
        {new Date(content.createdAt).toLocaleDateString('ko', {
          hour12: false,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
        })}
      </ContentDate>
    </Container>
  );
}

const Container = styled.div<{ isMe?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  word-break: break-all;
  line-height: 1.5rem;

  ${({ isMe }) =>
    isMe &&
    css`
      flex-direction: row-reverse;
      text-align: end;
    `}
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const UserName = styled.div`
  font-size: 0.875rem;
`;

const Content = styled.p<{ isMe?: boolean }>`
  background-color: #e6e6e6;
  padding: 0.375rem 0.875rem;
  border-radius: 0.5rem;

  ${({ isMe }) =>
    isMe &&
    css`
      background-color: ${COLORS.primary1};
      color: ${COLORS.white};
    `}
`;

const ContentDate = styled.span`
  font-size: 0.875rem;
  color: ${COLORS.grey1};
`;
