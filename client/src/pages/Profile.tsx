import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import api from 'src/api';
import Button from 'src/components/common/Button';
import Layout from 'src/components/common/Layout';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components/macro';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  return (
    <Layout title="프로필">
      <Container>
        <Name>{user?.name}</Name>
        <Button
          onClick={async () => {
            await api.logout();
            setUser(null);
            navigate('/');
          }}
        >
          로그아웃
        </Button>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
`;

const Name = styled.p`
  align-self: center;
`;
