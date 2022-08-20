import { Link } from 'react-router-dom';
import { MoreVertical } from 'src/assets/icons';
import Header from 'src/components/common/Header';

export default function Product() {
  const isSeller = true;
  return (
    <>
      <Header
        title=""
        rightButton={
          isSeller && (
            <Link to="/write">
              <MoreVertical />
            </Link>
          )
        }
      />
      <Link to={`${isSeller ? '/chat' : '/chat:1'}`}>
        <button>{isSeller ? '채팅목록보기' : '문의하기'}</button>
      </Link>
    </>
  );
}
