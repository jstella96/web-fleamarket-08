import { useNavigate } from 'react-router-dom';
import Header from 'src/components/common/Header';
import styled from 'styled-components';

export default function Category() {
  const categories = [
    { id: 1, name: 'ㅇㅇㅇ' },
    { id: 2, name: '나' },
  ];

  const navigate = useNavigate();

  return (
    <Container>
      <Header title="카테고리" />
      {categories.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => {
            navigate('/');
          }}
        >
          {name}
        </button>
      ))}
    </Container>
  );
}
const Container = styled.div`
  background: #555555;
`;
