import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Add, Close } from 'src/assets/icons';
import Alert from 'src/components/common/Alert';
import Layout from 'src/components/common/Layout';
import RegionInputModal from 'src/components/region/RegionInputModal';
import COLORS from 'src/constants/colors';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { userState } from 'src/recoil/atoms/user';
import styled from 'styled-components';

export default function MyRegion() {
  const user = useRecoilValue(userState);
  const [showRegionInputModal, setShowRegionInputModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { deleteRegion, changePrimaryRegion } = useUserRigionState();
  const handleDeleteRegion = (regionCode: number) => {
    if (user?.userRegions.length === 1) {
      setShowAlert(true);
      return;
    }
    deleteRegion(regionCode);
  };

  return (
    <Layout title="내 동네 설정하기">
      <Text>
        내 동네는 최소 1개 이상
        <br />
        최대 2개까지 설정 가능해요
      </Text>
      <ButtonWrapper>
        {user?.userRegions.map(({ region, name, isPrimary }) => (
          <button
            onClick={() => changePrimaryRegion(region.code)}
            key={region.code}
            className={isPrimary ? 'isPrimary' : ''}
          >
            {region.name}
            <Close
              onClick={(e) => {
                e.preventDefault();
                handleDeleteRegion(region.code);
              }}
            />
          </button>
        ))}
        {user?.userRegions.length !== 2 && (
          <button className="add" onClick={() => setShowRegionInputModal(true)}>
            <Add />
          </button>
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
    </Layout>
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
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    background: ${COLORS.white};
    border: 1px solid ${COLORS.primary1};
    color: ${COLORS.primary1};
    width: 8.5rem;
    height: 2.25rem;
    border-radius: 0.5rem;
    margin: 0 1rem;
    display: flex;
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
  }
  svg {
    color: ${COLORS.primary2};
    width: 1rem;
    height: 1rem;
  }
`;
