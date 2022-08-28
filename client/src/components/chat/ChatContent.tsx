import COLORS from 'src/constants/colors';
import { flexColumn, flexRow } from 'src/styles/common';
import { ChatContent as ChatContentType } from 'src/types';
import { getFullTimeString, getTimeString, isToday } from 'src/utils/date';
import styled, { css } from 'styled-components/macro';

interface ChatContentProps {
  content: ChatContentType;
  isMe?: boolean;
  showUser?: boolean;
  showTime?: boolean;
}

export default function ChatContent({
  content,
  isMe,
  showUser,
  showTime,
}: ChatContentProps) {
  return (
    <Container isMe={isMe}>
      <UserContainer>
        {!isMe && showUser && <UserName>{content.user.name}</UserName>}
        <ContentContainer isMe={isMe}>
          <Content isMe={isMe}>{content.content}</Content>
          {showTime && (
            <ContentDate isMe={isMe}>
              {isToday(content.createdAt)
                ? getTimeString(content.createdAt)
                : getFullTimeString(content.createdAt)}
            </ContentDate>
          )}
        </ContentContainer>
      </UserContainer>
    </Container>
  );
}

const Container = styled.div<{ isMe?: boolean }>`
  ${flexRow};
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  word-break: break-all;
  line-height: 1.5rem;

  ${({ isMe }) =>
    isMe &&
    css`
      flex-direction: row-reverse;
    `}
`;

const UserContainer = styled.div`
  ${flexColumn};
  align-items: baseline;
`;

const UserName = styled.div`
  font-size: 0.875rem;
`;

const ContentContainer = styled.div<{ isMe?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  ${({ isMe }) =>
    isMe &&
    css`
      flex-direction: row-reverse;
    `}
`;

const Content = styled.p<{ isMe?: boolean }>`
  background-color: #e6e6e6;
  padding: 0.375rem 0.875rem;
  border-radius: 0.5rem;
  max-width: 17rem;

  ${({ isMe }) =>
    isMe &&
    css`
      background-color: ${COLORS.primary1};
      color: ${COLORS.white};
    `}
`;

const ContentDate = styled.span<{ isMe?: boolean }>`
  min-width: 9rem;
  font-size: 0.875rem;
  color: ${COLORS.grey1};

  ${({ isMe }) =>
    isMe &&
    css`
      text-align: end;
    `}
`;
