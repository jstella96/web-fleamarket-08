import { useEffect, useState } from 'react';
import api from 'src/api';
import { MoreVertical } from 'src/assets/icons';
import { Product } from 'src/types';
import ProductItem from '../common/ProductItem';
import LikeButton from './LikeButton';

interface ProductItemWrapperProps {
  type?: string;
}

export default function ProductItemWrapper({ type }: ProductItemWrapperProps) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const initProducts = async () => {
      const { data } = await api.getProducts(type);
      setProducts(data);
    };
    initProducts();
  }, [type]);

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
    </>
  );
}
