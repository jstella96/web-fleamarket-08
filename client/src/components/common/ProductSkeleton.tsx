import React from 'react';
import { PRODUCT_LIMIT } from 'src/constants/product';
import {
  ProductContainer,
  RightPanelContainer,
  ImageContainer,
} from 'src/styles/productLayouts';
import styled from 'styled-components/macro';
import SkeletonItem from './SkeletonItem';

const ProductSkeleton = React.forwardRef((ref: any) => (
  <SkeletonContainer ref={ref}>
    {new Array(PRODUCT_LIMIT).fill('').map((_, i) => (
      <ProductContainerSkeleton>
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
  ${ImageContainer};
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
