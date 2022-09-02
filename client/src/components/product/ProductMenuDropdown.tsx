import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'src/assets/icons';
import SIZES from 'src/constants/sizes';
import ConfirmModal from '../common/ConfirmModal';
import { Dropdown, DropdownBody, DropdownHeader } from '../common/Dropdown';

interface ProductMenuDropdownProps {
  id: number;
  deleteProduct: () => void;
}

export default function ProductMenuDropdown({
  id,
  deleteProduct,
}: ProductMenuDropdownProps) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <button onClick={(e) => e.preventDefault()}>
      <Dropdown>
        <DropdownHeader>
          <MoreVertical></MoreVertical>
        </DropdownHeader>
        <DropdownBody width={SIZES.productMenuWidth}>
          <button onClick={() => navigate(`/write/${id}`)}>수정하기</button>
          <button
            onClick={() => {
              setShowDeleteConfirm(true);
            }}
          >
            삭제하기
          </button>
        </DropdownBody>
      </Dropdown>

      {showDeleteConfirm && (
        <ConfirmModal
          message="포스팅을 삭제하시겠습니까?"
          close={() => {
            setShowDeleteConfirm(false);
          }}
          onClickConfirmButton={() => {
            deleteProduct();
          }}
        ></ConfirmModal>
      )}
    </button>
  );
}
