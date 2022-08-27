import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from 'src/api';
import { ChevronRight, MapPin } from 'src/assets/icons';
import Layout from 'src/components/common/Layout';
import ImageUploader from 'src/components/common/ImageUploader';
import useCategories from 'src/components/hooks/useCategories';
import CategoryModal from 'src/components/write/categoryModal';
import COLORS from 'src/constants/colors';
import SIZES from 'src/constants/sizes';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { Category, ProductDetail } from 'src/types';
import styled from 'styled-components/macro';
import { fixedBottom, flexColumn, flexRow } from 'src/styles/common';

const MAX_PRICE = 100000000;

export default function Write() {
  const categories = useCategories();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [price, setPrice] = useState<number>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { getPrimaryRegionName } = useUserRigionState();
  const [region, setRegion] = useState(() => getPrimaryRegionName());
  const { id } = useParams();
  useEffect(() => {
    const initProduct = async () => {
      if (id === undefined) return;
      const { data } = await api.getProduct(Number(id));
      setProduct(data);
    };
    initProduct();
  }, [id]);

  const setProduct = (data: ProductDetail) => {
    const imageUrls = data.images.map((image) => image.imageUrl);
    setImageUrls(imageUrls);
    setTitle(data.title);
    setContent(data.content);
    setSelectedCategory(data.category);
    setPrice(+data.price);
    setRegion(data.region.name);
  };

  const isFormValid = useMemo(
    () => (title && selectedCategory && content ? true : false),
    [title, selectedCategory, content]
  );

  const handleClickSubmitButton = async () => {
    if (!selectedCategory) return;

    const submitData = {
      title,
      price: price || 0,
      content,
      categoryId: selectedCategory.id,
      imageUrls: imageUrls,
    };

    if (id) {
      const { data } = await api.updateProduct(+id, submitData);
      navigate(`/product/${data.id}`, { replace: true });
    } else {
      const { data } = await api.createProduct(submitData);
      navigate(`/product/${data.id}`, { replace: true });
    }
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
          maxLength={30}
        />

        <ImageUploader
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        ></ImageUploader>

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
          placeholder="₩ 가격(선택사항)"
          value={price?.toLocaleString() || ''}
          onChange={({ target: { value } }) => {
            const lastCharacter = value[value.length - 1];
            if (lastCharacter === undefined) {
              setPrice(undefined);
              return;
            }

            if (!/[0-9]/.test(lastCharacter)) return;

            const numValue = Number(value.split(',').join(''));
            const priceValue = numValue > 100000000 ? MAX_PRICE : numValue;
            setPrice(priceValue);
          }}
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
        {region}
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
  ${flexColumn};
  padding: 1rem;
  height: calc(100% - ${SIZES.writeFooter});
  input,
  p,
  textarea {
    ${flexRow}
    padding: 1.5rem 0;
    border: none;
    border-bottom: 1px solid ${COLORS.grey3};
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }
  label {
    ${flexRow};
    gap: 0.25rem;
  }
`;
const CategoryButton = styled.p`
  ${flexRow};
  justify-content: space-between;
  align-items: center;
`;
const Location = styled.div`
  ${fixedBottom};
  ${flexRow};
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid ${COLORS.grey3};
  background-color: ${COLORS.white};
`;
