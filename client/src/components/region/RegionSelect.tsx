import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Add, Close } from 'src/assets/icons';
import Alert from 'src/components/common/Alert';
import RegionInputModal from 'src/components/region/RegionInputModal';
import COLORS from 'src/constants/colors';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { userState } from 'src/recoil/atoms/user';
import { absoluteCenter, flexRow } from 'src/styles/common';
import { getRegionName } from 'src/utils/region';
import styled from 'styled-components';
import ConfirmModal from '../common/ConfirmModal';

const CLASS_NAMES = {
  regionDeleteButton: 'region-delete-button',
};

export default function RegionSelect() {
  const user = useRecoilValue(userState);
  const [showRegionInputModal, setShowRegionInputModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { deleteRegion, changePrimaryRegion } = useUserRigionState();

  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState({
    showConfirm: false,
    regionCode: -1,
  });

  const handleDeleteRegion = (regionCode: number) => {
    if (user?.userRegions?.length === 1) {
      setShowAlert(true);
      return;
    }
    setDeleteConfirmInfo({ showConfirm: true, regionCode: regionCode });
  };

  return (
    <div>
      <Text>
        내 동네는 최소 1개 이상
        <br />
        최대 2개까지 설정 가능해요
      </Text>
      <ButtonWrapper>
        {user?.userRegions?.map(({ region, isPrimary }) => (
          <RegionButtonContainer key={region.code}>
            <RegionButton
              onClick={() => changePrimaryRegion(region.code)}
              className={isPrimary ? 'isPrimary' : ''}
            >
              {getRegionName(region.name)}
            </RegionButton>
            <RegionDeleteButton>
              <Close
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteRegion(region.code);
                }}
              />
            </RegionDeleteButton>
          </RegionButtonContainer>
        ))}
        {user?.userRegions?.length !== 2 && (
          <RegionButton
            className="add"
            onClick={() => setShowRegionInputModal(true)}
          >
            <Add />
          </RegionButton>
        )}
      </ButtonWrapper>

      {showAlert && (
        <Alert
          close={() => setShowAlert(false)}
          message="내 동네가 1개 이상은 존재해야합니다"
        />
      )}
      {showRegionInputModal && (
        <RegionInputModal
          close={() => setShowRegionInputModal(false)}
          nowRegion={user?.userRegions[0]}
        />
      )}
      {deleteConfirmInfo.showConfirm && (
        <ConfirmModal
          close={() =>
            setDeleteConfirmInfo({ showConfirm: false, regionCode: -1 })
          }
          message="선택한 동네를 삭제하시겠습니까?"
          onClickConfirmButton={() => {
            deleteRegion(deleteConfirmInfo.regionCode);
            setDeleteConfirmInfo({ showConfirm: false, regionCode: -1 });
          }}
        />
      )}
    </div>
  );
}

const Text = styled.p`
  width: 100%;
  text-align: center;
  color: ${COLORS.grey1};
  font-size: 1rem;
  line-height: 1.5;
  padding: 2rem;
`;

const ButtonWrapper = styled.div`
  ${flexRow};
  justify-content: center;

  svg {
    color: ${COLORS.primary2};
    width: 1rem;
    height: 1rem;
  }
`;

const RegionButtonContainer = styled.div`
  position: relative;
`;

const RegionButton = styled.button`
  ${flexRow};
  cursor: pointer;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.primary1};
  color: ${COLORS.primary1};
  width: 8.5rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  margin: 0 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  font-size: 0.875rem;
  &.isPrimary {
    background: ${COLORS.primary1};
    border: 1px solid ${COLORS.white};
    color: ${COLORS.white};
  }
  &.add {
    justify-content: center;
  }
`;

const RegionDeleteButton = styled.button`
  ${flexRow};
  position: absolute;
  top: 50%;
  right: 1.625rem;
  transform: translateY(-50%);
`;
