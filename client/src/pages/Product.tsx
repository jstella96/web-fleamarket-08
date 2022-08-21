import { Link } from 'react-router-dom';
import { MoreVertical } from 'src/assets/icons';
import Header from 'src/components/common/Header';
import styled from 'styled-components/macro';
export default function Product() {
  const isSeller = true;
  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
  background: #555555;
`;
