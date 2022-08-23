import { useEffect, useState } from 'react';
import api from 'src/api';
import COLORS from 'src/constants/colors';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { Region, UserRegion } from 'src/types';
import styled from 'styled-components';

interface RegionInputModalProps {
  close: () => void;
  nowRegion: UserRegion | undefined;
}

export default function RegionInputModal({
  close,
  nowRegion,
}: RegionInputModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const { submitRegion } = useUserRigionState();

  useEffect(() => {
    const requestGetRegions = async () => {
      if (!inputValue) {
        setRegions([]);
        return;
      }
      const regions = await api.getRegions(inputValue);
      setRegions(regions.data);
    };
    requestGetRegions();
  }, [inputValue]);

  const printResultText = () => {
    if (regions.length === 0 && inputValue.length !== 0) {
      return (
        <Warning>
          검색 결과가 없어요
          <br /> 동네이름을 다시 확인해주세요!
        </Warning>
      );
    }
    if (regions.length > 0) {
      return <Result>'{inputValue}' 검색결과</Result>;
    }
  };
  return (
    <Modal>
      <Section>
        <Title>우리동네를 입력하세요</Title>
        <Input
          placeholder="내 동네 이름(동,읍,면)으로 검색"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></Input>
        <SearchResult>
          {printResultText()}
          <Regions>
            {regions.map((region) => (
              <RegionItem
                className={
                  nowRegion?.regionCode === region.code ? 'duplicate' : ''
                }
                key={region.code}
                onClick={() => {
                  submitRegion(region);
                  close();
                }}
              >
                {region.name}
              </RegionItem>
            ))}
          </Regions>
        </SearchResult>
        <Footer>
          <button onClick={() => close()}>취소</button>
        </Footer>
      </Section>
    </Modal>
  );
}

const Modal = styled.div`
  color: ${COLORS.titleActive};

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(34, 34, 34, 0.3);

  display: flex;
  align-items: center;
`;
const Section = styled.div`
  font-size: 0.875rem;
  padding: 1rem;
  background: ${COLORS.offWhite};
  width: 18rem;

  margin: 0 auto;
  background: ${COLORS.white};
  display: flex;
  flex-direction: column;
  border-radius: 0.6rem;
  justify-content: space-between;
`;
const SearchResult = styled.main`
  padding: 0.25rem;
  height: 18rem;
`;
const Title = styled.p`
  padding: 0 0.25rem;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  width: 100%;
  color: ${COLORS.titleActive};
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${COLORS.grey3};
`;
const Footer = styled.div`
  padding: 0 0.25rem;
  width: 100%;
  display: flex;
  justify-content: end;
  button {
    border: none;
    background: none;
    padding: 0;
  }
  button:nth-child(1) {
    color: ${COLORS.grey1};
  }
`;
const Regions = styled.ul`
  margin: 0.5rem 0;
  height: 80%;
  overflow: auto;
`;
const RegionItem = styled.li`
  line-height: 1.5;
  border-bottom: 1px solid ${COLORS.grey3};
  padding: 0.85rem 0;
  &.duplicate {
    background: ${COLORS.grey3};
    pointer-events: none;
  }
`;
const Warning = styled.p`
  padding-top: 2rem;
  line-height: 1.5;
  color: ${COLORS.grey1};
  text-align: center;
`;
const Result = styled.p`
  margin-top: 0.2rem;
  font-weight: 600;
`;
