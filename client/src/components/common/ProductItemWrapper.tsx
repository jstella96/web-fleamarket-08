import { useEffect, useState } from 'react';
import api from 'src/api';
import { Heart, MoreVertical } from 'src/assets/icons';
import { Product } from 'src/types';
import ProductItem from '../common/ProductItem';

interface ProductItemWrapperProps {
  type?: string;
}

export default function ProductItemWrapper({ type }: ProductItemWrapperProps) {
  const [products, setProduts] = useState<Product[]>([]);
  useEffect(() => {
    const initProducts = async () => {
      const { data } = await api.getProducts(type);
      setProduts(data);
    };
    initProducts();
  }, [type]);
  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          rightButton={type ? <MoreVertical /> : <Heart />}
        />
      ))}
    </>
  );
}
