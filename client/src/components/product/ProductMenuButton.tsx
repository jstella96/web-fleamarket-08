import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'src/assets/icons';
import SIZES from 'src/constants/sizes';
import ConfirmModal from '../common/ConfirmModal';
import DropDownModal from '../common/DropDownModal';

interface ProductMenuButtonProps {
  id: number;
  deleteProduct: () => void;
}

export default function ProductMenuButton({
  id,
  deleteProduct,
}: ProductMenuButtonProps) {
  const navigate = useNavigate();
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const menu = [
    {
      label: '수정하기',
      onClick: () => navigate(`/write/${id}`),
    },
    {
      label: '삭제하기',
      onClick: () => {
        setShowDropDownModal(false);
        setShowDeleteConfirm(true);
      },
    },
  ];
  const handleClickMenuButton = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const clikedButton = (e.target as Element).closest('button');

    if (!clikedButton) return;
    const relativeTop =
      clikedButton.getBoundingClientRect().top + clikedButton.clientHeight;
    const relativeRight = clikedButton.getBoundingClientRect().right;
    setTop(relativeTop);
    setLeft(relativeRight - SIZES.dropDownWidth);
  };
  return (
    <div onClick={(e) => e.preventDefault()}>
      <button>
        <MoreVertical
          onClick={(e) => {
            handleClickMenuButton(e);
            setShowDropDownModal(true);
          }}
        ></MoreVertical>
      </button>
      {showDropDownModal && (
        <DropDownModal
          menu={menu}
          close={() => setShowDropDownModal(false)}
          left={left}
          top={top}
          width={`${SIZES.dropDownWidth}px`}
        ></DropDownModal>
      )}
      {showDeleteConfirm && (
        <ConfirmModal
          message="포스팅을 삭제하시겠습니까?"
          close={() => {
            setShowDeleteConfirm(false);
          }}
          onClickConfirmButton={() => {
            deleteProduct();
            setShowDropDownModal(false);
          }}
        ></ConfirmModal>
      )}
    </div>
  );
}
