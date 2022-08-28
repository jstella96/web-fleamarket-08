import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import api from 'src/api';
import { categoryState } from 'src/recoil/atoms/category';
import { Product } from 'src/types';
import ProductItem from './ProductItem';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ProductSkeleton from './ProductSkeleton';
import { getPrimaryRegionCode, userState } from 'src/recoil/atoms/user';
import { PRODUCT_LIMIT } from 'src/constants/product';

interface ProductItemListProps {
  type?: 'like' | 'sale';
}

export default function ProductItemList({ type }: ProductItemListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const loader = useRef(null);
  const [page, setPage] = useState(0);
  const category = useRecoilValue(categoryState);
  const [hasScrollFinished, setHasScrollFinished] = useState(true);
  const primaryRegionCode = useRecoilValue(getPrimaryRegionCode);
  const user = useRecoilValue(userState);
  const getProducts = useCallback(async () => {
    const categoryId = type ? undefined : category?.id;
    const { data } = await api.getProducts(
      type,
      categoryId,
      page,
      primaryRegionCode
    );
    if (data.length < PRODUCT_LIMIT) setHasScrollFinished(false);
    setPage((prev) => prev + 1);
    setProducts((prev) => {
      return [...prev, ...data];
    });
  }, [type, category, page, primaryRegionCode]);

  useEffect(() => {
    setPage(0);
    setProducts([]);
    setHasScrollFinished(true);
  }, [type, category, primaryRegionCode]);

  useInfiniteScroll({ loader: loader, asyncCallback: getProducts });

  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          productItem={product}
          isSeller={user?.id === product.author.id}
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
