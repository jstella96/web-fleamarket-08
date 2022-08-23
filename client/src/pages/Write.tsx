import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'src/api';
import { ChevronRight, MapPin } from 'src/assets/icons';
import Layout from 'src/components/common/Layout';
import useCategories from 'src/components/hooks/useCategories';
import CategoryModal from 'src/components/write/categoryModal';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { Category } from 'src/types';
import styled from 'styled-components/macro';

export default function Write() {
  const categories = useCategories();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const isFormValid = useMemo(
    () => (title && selectedCategory && content ? true : false),
    [title, selectedCategory, content]
  );
  const { getPrimaryRegionCode, getPrimaryRegionName } = useUserRigionState();

  const handleClickSubmitButton = async () => {
    if (!selectedCategory) return;

    const { data } = await api.createProduct({
      title,
      price: price || 0,
      content,
      categoryId: selectedCategory.id,
      imageUrls: [],
      regionCode: getPrimaryRegionCode(),
    });
    navigate(`/product/${data.id}`, { replace: true });
  };

  const printCategoryName = () => {
    if (!selectedCategory) return <span>카테고리 선택</span>;
    return <span>{selectedCategory.name}</span>;
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
        <CategoryButton onClick={() => setShowCategoryModal(true)}>
          {printCategoryName()}
          <ChevronRight />
        </CategoryButton>
        {showCategoryModal && (
          <CategoryModal
            close={() => setShowCategoryModal(false)}
            categories={categories}
            selectCategory={setSelectedCategory}
            selectedCategoryId={selectedCategory?.id}
          />
        )}

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
        {getPrimaryRegionName()}
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
  padding: 1rem;
  height: calc(100% - ${SIZES.writeFooter});
  input,
  p,
  textarea {
    display: flex;
    padding: 1.5rem 0;
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
const CategoryButton = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
