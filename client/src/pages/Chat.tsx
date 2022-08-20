import { Link } from 'react-router-dom';
import Header from 'src/components/common/Header';

export default function Chat() {
  return (
    <div>
      <Header title="채팅하기" />
      <Link to="/chat/2">채팅방</Link>
    </div>
  );
}
