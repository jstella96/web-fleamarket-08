import React from 'react';
import { PRODUCT_LIMIT } from 'src/constants/product';
import {
  ProductContainer,
  productImage,
  RightPanelContainer,
} from 'src/styles/productLayouts';
import SkeletonItem from 'src/styles/skeletonItem';
import styled from 'styled-components/macro';

const ProductSkeleton = React.forwardRef((props: any, ref: any) => (
  <SkeletonContainer ref={ref}>
    {new Array(PRODUCT_LIMIT).fill('').map((_, i) => (
      <ProductContainerSkeleton key={i}>
        <ImageContainerSkeleton></ImageContainerSkeleton>
        <RightPanelContainerSkeleton>
          <Title></Title>
          <Content></Content>
          <Footer></Footer>
        </RightPanelContainerSkeleton>
      </ProductContainerSkeleton>
    ))}
  </SkeletonContainer>
));
export default ProductSkeleton;

const SkeletonContainer = styled.div``;

const ProductContainerSkeleton = styled.div`
  ${ProductContainer};
`;

const ImageContainerSkeleton = styled.div`
  ${SkeletonItem};
  ${productImage};
`;

const RightPanelContainerSkeleton = styled.div`
  ${RightPanelContainer};
  width: 100%;
`;

const Title = styled.div`
  ${SkeletonItem};
  height: 1.2rem;
  width: 80%;
`;

const Content = styled.div`
  ${SkeletonItem};
  height: 1.2rem;
  width: 40%;
`;

const Footer = styled.div`
  ${SkeletonItem};
  height: 1.2rem;
  width: 70;
`;
