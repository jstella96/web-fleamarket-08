import { useState } from 'react';
import { Add, Close } from 'src/assets/icons';
import Header from 'src/components/common/Header';
import RegionInputModal from 'src/components/region/RegionInputModal';
import colors from 'src/constants/colors';
import styled from 'styled-components';

export default function Region() {
  const [showRegionInputModal, setShowRegionInputModal] = useState(false);
  const tempRegion = [
    {
      code: 1,
      name: '역삼동',
      isPrimary: true,
    },
  ];

  return (
    <Container>
      <Header title="내 동네 설정하기" />
      <Text>
        지역은 최소 1개 이상
        <br />
        최대 2개까지 설정 가능해요
      </Text>
      <ButtonWrapper>
        {tempRegion.map(({ code, name, isPrimary }) => (
          <button key={code} className={isPrimary ? 'isPrimary' : ''}>
            {name}
            <Close />
          </button>
        ))}
        {tempRegion.length !== 2 && (
          <button className="add" onClick={() => setShowRegionInputModal(true)}>
            <Add />
          </button>
        )}
      </ButtonWrapper>
      <RegionInputModal
        isOpen={showRegionInputModal}
        close={() => {
          setShowRegionInputModal(false);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.p`
  width: 100%;
  text-align: center;
  color: ${colors.grey1};
  font-size: 1rem;
  line-height: 1.5;
  padding: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    background: ${colors.white};
    border: 1px solid ${colors.primary1};
    color: ${colors.primary1};
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
      background: ${colors.primary1};
      border: 1px solid ${colors.white};
      color: ${colors.white};
    }
    &.add {
      justify-content: center;
    }
  }
  svg {
    color: ${colors.primary2};
    width: 1rem;
    height: 1rem;
  }
`;
