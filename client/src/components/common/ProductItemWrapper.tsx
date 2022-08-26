import { useCallback, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { MoreVertical } from 'src/assets/icons';
import { categoryState } from 'src/recoil/atoms/category';

import { Product } from 'src/types';
import ProductItem from '../common/ProductItem';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import LikeButton from './LikeButton';
import ProductSkeleton from './ProductSkeleton';

interface ProductItemWrapperProps {
  type?: 'like' | 'sale';
}

export default function ProductItemWrapper({ type }: ProductItemWrapperProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const loader = useRef(null);
  const [page, setPage] = useState(1);
  const category = useRecoilValue(categoryState);
  const [hasScrollFinished, setHasScrollFinished] = useState(true);

  const getProducts = useCallback(async () => {
    const categoryId = type ? undefined : category?.id;
    const { data } = await api.getProducts(type, categoryId, page);
    if (data.length === 0) setHasScrollFinished(false);
    setPage(page + 1);
    setProducts((prev) => {
      return [...prev, ...data];
    });
  }, [type, category, page]);

  useInfiniteScroll({ loader: loader, asyncCallback: getProducts });

  const clickLikeButton = (productId: number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          product.isLiked = !product.isLiked;
          product.likeCount += product.isLiked ? 1 : -1;
        }
        return product;
      });
    });
  };

  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          rightButton={
            type === 'sale' ? (
              <MoreVertical />
            ) : (
              <LikeButton
                isLike={product.isLiked}
                productId={product.id}
                onClick={() => {
                  clickLikeButton(product.id);
                }}
              />
            )
          }
        />
      ))}
      {hasScrollFinished ? (
        <ProductSkeleton ref={loader}></ProductSkeleton>
      ) : (
        <></>
      )}
    </>
  );
}
