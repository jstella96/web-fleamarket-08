import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from 'src/api';
import Layout from 'src/components/common/Layout';
import ProductImage from 'src/components/common/ProductImage';
import COLORS from 'src/constants/colors';
import { ChatRoom } from 'src/types';
import { getRelativeTime } from 'src/utils/date';
import styled from 'styled-components/macro';

export default function Chat() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>();
  const { productId } = useParams();

  useEffect(() => {
    const initChatRooms = async () => {
      if (productId === undefined) return null;
      const { data } = await api.getChatRooms(Number(productId));
      setChatRooms(data);
    };

    initChatRooms();
  }, [productId]);

  return (
    <Layout title="채팅 목록">
      {chatRooms?.map((chatRoom) => (
        <ChatRoomLink
          key={chatRoom.id}
          to={`/chat-detail/${chatRoom.product.id}`}
        >
          <LeftPanel>
            <UserName>{chatRoom.buyer.name}</UserName>
            <LastChat>{chatRoom.lastChat.content}</LastChat>
          </LeftPanel>
          <RightPanel>
            <div>
              <p>{getRelativeTime(chatRoom.lastChat.createdAt)}</p>
              <UnreadContentsCount>
                {chatRoom.unReadContents.length}
              </UnreadContentsCount>
            </div>
            <ProductImage src={chatRoom.product.thumbnail.imageUrl} />
          </RightPanel>
        </ChatRoomLink>
      ))}
    </Layout>
  );
}

const ChatRoomLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${COLORS.grey3};
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const UserName = styled.p`
  font-weight: 600;
`;

const LastChat = styled.p`
  max-width: 14rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${COLORS.grey1};
`;

const RightPanel = styled.div`
  display: flex;
  gap: 1rem;
  color: ${COLORS.grey1};

  div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
`;

const UnreadContentsCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  border-radius: 100%;
  background-color: ${COLORS.primary3};
  color: ${COLORS.white};
`;
