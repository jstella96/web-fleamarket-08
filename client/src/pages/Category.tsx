import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Layout from 'src/components/common/Layout';
import useCategories from 'src/components/hooks/useCategories';
import { categoryState } from 'src/recoil/atoms/category';
import styled from 'styled-components/macro';

export default function Category() {
  const categories = useCategories();
  const setCategory = useSetRecoilState(categoryState);
  const navigate = useNavigate();

  return (
    <Layout title="카테고리">
      <Container>
        <CategoryButton
          onClick={() => {
            setCategory(null);
            navigate('/');
          }}
        >
          <img
            src="https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/DWJHQLSEUND3NAEAVQ2F5L2LAA.jpg"
            alt={`전체 선택 이미지`}
          />
          전체
        </CategoryButton>

        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={() => {
              setCategory(category);
              navigate('/');
            }}
          >
            <img
              src="https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/DWJHQLSEUND3NAEAVQ2F5L2LAA.jpg"
              alt={`${category.name} 이미지`}
            />
            {category.name}
          </CategoryButton>
        ))}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1rem;
  padding: 1rem;
`;

const CategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;

  img {
    width: 3rem;
  }
`;
