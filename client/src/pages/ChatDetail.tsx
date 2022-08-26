import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { LogOut } from 'src/assets/icons';
import ChatContent from 'src/components/chat/ChatContent';
import ChatForm from 'src/components/chat/ChatForm';
import ChatLeaveModal from 'src/components/chat/ChatLeaveModal';
import ProductInfo from 'src/components/chat/ProductInfo';
import Layout from 'src/components/common/Layout';
import SIZES from 'src/constants/sizes';
import { userState } from 'src/recoil/atoms/user';
import { ChatContent as ChatContentType, ChatRoom, Product } from 'src/types';
import styled from 'styled-components/macro';

export default function ChatDetail() {
  const { productId } = useParams();
  const [chats, setChats] = useState<ChatContentType[]>();
  const [chatRoom, setChatRoom] = useState<ChatRoom>();
  const [product, setProduct] = useState<Product>();
  const user = useRecoilValue(userState);
  const eventSource = useRef<EventSource>();
  const [showChatLeaveModal, setShowChatLeaveModal] = useState(false);

  const moveScrollToEnd = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  const closeChat = () => eventSource.current?.close();

  const connectChat = useCallback((chatRoomId: Number) => {
    eventSource.current = new EventSource(
      `${process.env.REACT_APP_API_ENDPOINT}/chats/${chatRoomId}/connect`
    );

    eventSource.current.onmessage = (event: MessageEvent<string>) => {
      const data: ChatContentType = JSON.parse(event.data);
      setChats((prev) => [...(prev || []), data]);
      moveScrollToEnd();
    };

    eventSource.current.addEventListener('bye', () => {
      closeChat();
      connectChat(chatRoomId);
    });
  }, []);

  const partner = useMemo(() => {
    if (!product || !chatRoom) return null;
    return user?.id === product.author.id ? chatRoom.seller : chatRoom.buyer;
  }, [user, product, chatRoom]);

  useEffect(() => {
    const init = async () => {
      if (productId === undefined) return;

      const { data } = await api.getChatDetail(Number(productId));
      const { chatContents, chatRoom, product } = data;
      setChats(chatContents);
      setChatRoom(chatRoom);
      setProduct(product);
      moveScrollToEnd();

      if (chatRoom) connectChat(chatRoom.id);
    };

    init();

    return () => {
      closeChat();
    };
  }, [productId, connectChat]);

  return (
    <Layout
      title={partner?.name}
      rightButton={
        <button onClick={() => setShowChatLeaveModal(true)}>
          <LogOut />
        </button>
      }
    >
      {product && <ProductInfo product={product} />}
      <Container>
        {chats?.map((content) => (
          <ChatContent
            key={content.id}
            content={content}
            isMe={content.user.id === user?.id}
          />
        ))}
        <ChatForm
          onSubmit={async (content) => {
            if (chatRoom) {
              await api.createChat(chatRoom.id, { content });
              return;
            }

            if (productId === undefined) return;
            const { data: chatRoomData } = await api.createChatRoom({
              content,
              productId: Number(productId),
            });
            setChatRoom(chatRoomData);
            connectChat(chatRoomData.id);
            await api.createChat(chatRoomData.id, { content });
          }}
        />
        {showChatLeaveModal && (
          <ChatLeaveModal
            close={() => setShowChatLeaveModal(false)}
            chatRoomId={chatRoom?.id}
          />
        )}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  padding-top: ${SIZES.chatProductInfo};
  padding-bottom: ${SIZES.chatFooter};
`;
