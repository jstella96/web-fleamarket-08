import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'src/api';
import Header from 'src/components/common/Header';
import { ChatDetail, ChatRoom } from 'src/types';
import styled from 'styled-components/macro';

export default function Chat() {
  const [chatInput, setChatInput] = useState('');
  const [chats, setChats] = useState<ChatDetail[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom>();
  const { id: productId } = useParams();

  useEffect(() => {
    let eventSource: EventSource;

    const initChats = async () => {
      if (productId === undefined) return;
      const { data: chatRoomData } = await api.createChatRoom({
        content: '',
        productId: Number(productId),
      });

      setChatRoom(chatRoomData);

      const { data: chatContentsData } = await api.getChats(chatRoomData.id);
      setChats(chatContentsData.contents);

      eventSource = new EventSource(
        `${process.env.REACT_APP_API_ENDPOINT}/chats/${chatRoomData.id}/connect`
      );

      eventSource.onmessage = function (event: MessageEvent<string>) {
        const data: ChatDetail = JSON.parse(event.data);
        setChats((prev) => [data, ...prev]);
      };
    };

    initChats();

    return () => {
      eventSource.close();
    };
  }, [productId]);

  return (
    <div>
      <Header title="채팅하기" />
      <p>배달이와의 채팅 - 임시 구현</p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!chatInput) return;
          if (!chatRoom) return;

          await api.createChat(chatRoom.id, { content: chatInput });
          setChatInput('');
        }}
      >
        <input
          placeholder="채팅 입력"
          value={chatInput}
          onChange={(event) => setChatInput(event.target.value)}
        />
        <button type="submit">입력</button>
      </form>
      <ul>
        {chats?.map((chat) => (
          <li key={chat.id}>
            <Content>
              <p>
                <span>{chat.user.name}: </span>
                <span>{chat.content}</span>
              </p>
              <ContentDate>
                {new Date(chat.createdAt).toLocaleDateString('ko', {
                  hour12: false,
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </ContentDate>
            </Content>
          </li>
        ))}
      </ul>
      {/* <Link to="/chat/2">채팅방</Link> */}
    </div>
  );
}

const Content = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding-right: 0.5rem;
  word-break: break-all;
  line-height: 1.5rem;
`;

const ContentDate = styled.span`
  min-width: 9rem;
`;
