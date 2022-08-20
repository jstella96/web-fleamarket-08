import { useNavigate } from 'react-router-dom';
import Header from 'src/components/common/Header';

export default function Category() {
  const categories = [
    { id: 1, name: 'ㅇㅇㅇ' },
    { id: 2, name: '나' },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Header title="카테고리" />
      {categories.map(({ id, name }) => (
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          {name}
        </button>
      ))}
    </>
  );
}
