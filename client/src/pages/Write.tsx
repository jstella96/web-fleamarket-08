import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';
import { MapPin } from 'src/assets/icons';
import Layout from 'src/components/common/Layout';
import useCategories from 'src/components/hooks/useCategories';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { Category } from 'src/types';
import styled from 'styled-components/macro';

export default function Write() {
  const categories = useCategories();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const isFormValid = useMemo(
    () => (title && selectedCategory && content ? true : false),
    [title, selectedCategory, content]
  );

  const handleClickSubmitButton = async () => {
    if (!selectedCategory) return;

    const { data } = await api.createProduct({
      title,
      price: price || 0,
      content,
      categoryId: selectedCategory.id,
      imageUrls: [],
    });
    navigate(`/product/${data.id}`, { replace: true });
  };

  return (
    <Layout
      title="글쓰기"
      rightButton={
        <SubmitButton disabled={!isFormValid} onClick={handleClickSubmitButton}>
          완료
        </SubmitButton>
      }
    >
      <InputsContainer>
        <input
          type="text"
          placeholder="글 제목"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <p>카테고리 선택</p>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="radio"
              name="category"
              value={category.id}
              onChange={() => setSelectedCategory(category)}
              checked={category.id === selectedCategory?.id}
            />
            {category.name}
          </label>
        ))}
        <input
          type="number"
          placeholder="₩ 가격(선택사항)"
          value={price || ''}
          onChange={({ target: { value } }) => setPrice(Number(value))}
        />
        <textarea
          rows={10}
          placeholder="게시글 내용을 작성해주세요."
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        ></textarea>
      </InputsContainer>
      <Location>
        <MapPin />
        동네
      </Location>
    </Layout>
  );
}

const SubmitButton = styled.button`
  border: none;
  background: none;
  color: ${COLORS.primary1};
  font-weight: 600;

  &:disabled {
    color: ${COLORS.grey2};
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: calc(100% - ${SIZES.writeFooter});

  input,
  textarea {
    padding: 1rem 0;
    border: none;
    border-bottom: 1px solid ${COLORS.grey3};
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }

  label {
    display: flex;
    gap: 0.25rem;
  }
`;

const Location = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${COLORS.grey3};
  background-color: ${COLORS.white};
`;
