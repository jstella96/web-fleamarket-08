import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'src/assets/icons';
import styled from 'styled-components';
import DropDown from '../common/DropDown';

export default function ProductHeaderButton({
  id,
  deleteProduct,
}: {
  id?: string;
  deleteProduct: () => void;
}) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button>
        <MoreVertical
          onClick={() => {
            setIsShow(true);
          }}
        ></MoreVertical>
      </button>
      {isShow && (
        <DropDown
          children={
            <ProductMenuContainer>
              <Link to={`/write/${id}`}>수정하기</Link>
              <button
                onClick={() => {
                  setIsShow(false);
                  deleteProduct();
                }}
              >
                삭제하기
              </button>
            </ProductMenuContainer>
          }
          close={() => {
            setIsShow(false);
          }}
        ></DropDown>
      )}
    </>
  );
}

const ProductMenuContainer = styled.div`
  a,
  button {
    text-align: center;
    display: inline-block;
    width: 100%;
    padding: 1rem 1em;
  }
`;
