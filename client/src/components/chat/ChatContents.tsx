import { useRecoilValue } from 'recoil';
import { userState } from 'src/recoil/atoms/user';
import { ChatContent as ChatContentType } from 'src/types';
import { isSameMinute } from 'src/utils/date';
import ChatContent from './ChatContent';

interface ChatContentsProps {
  chats?: ChatContentType[];
}

export default function ChatContents({ chats }: ChatContentsProps) {
  const user = useRecoilValue(userState);

  return (
    <>
      {chats?.map((content, index) => {
        const prevContent = chats[index - 1];
        console.log(prevContent);
        const showUser =
          prevContent?.user.id !== content.user.id ||
          !isSameMinute(prevContent?.createdAt, content.createdAt);

        const nextContent = chats[index + 1];
        const showTime =
          !nextContent ||
          nextContent.user.id !== content.user.id ||
          !isSameMinute(content.createdAt, chats[index + 1].createdAt);

        return (
          <ChatContent
            key={content.id}
            content={content}
            isMe={content.user.id === user?.id}
            showUser={showUser}
            showTime={showTime}
          />
        );
      })}
    </>
  );
}
