import { useEffect, useState } from 'react';
import api from 'src/api';
import COLORS from 'src/constants/colors';
import { getMyLocation } from 'src/utils/location';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { Location, Region, UserRegion } from 'src/types';
import styled, { css } from 'styled-components';
import Modal from '../common/Modal';
import Loading from '../common/Loading';

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
  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    const requestGetRegions = async () => {
      if (!inputValue) {
        setRegions([]);
        return;
      }
      const regions = await api.getRegions(inputValue);
      setRegions(regions.data);
      setIsLoding(false);
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

  const regionSerchCb = (location: Location) => {
    setInputValue(location.name);
  };

  return (
    <Modal close={close}>
      <Section>
        <Title>우리동네를 입력하세요</Title>
        <Input
          placeholder="내 동네 이름(동,읍,면)으로 검색"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></Input>
        <MyRegionSearchButton
          onClick={() => {
            setIsLoding(true);
            getMyLocation(regionSerchCb);
          }}
        >
          현재 위치로 검색
        </MyRegionSearchButton>
        <SearchResult>
          {!isLoding && printResultText()}
          <Regions>
            {isLoding ? (
              <LoadingContainer>
                <Loading />
                <span>오래 걸려요....</span>
              </LoadingContainer>
            ) : (
              regions.map((region) => (
                <RegionItem
                  isDuplicate={nowRegion?.regionCode === region.code}
                  key={region.code}
                  onClick={() => {
                    submitRegion(region);
                    close();
                  }}
                >
                  {region.name}
                </RegionItem>
              ))
            )}
          </Regions>
        </SearchResult>
        <Footer>
          <button onClick={() => close()}>취소</button>
        </Footer>
      </Section>
    </Modal>
  );
}

const Section = styled.section`
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
const MyRegionSearchButton = styled.button`
  text-align: center;
  padding-top: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  color: ${COLORS.primary1};
  margin: 0.2rem;
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
const RegionItem = styled.li<{ isDuplicate: boolean }>`
  ${(props) =>
    props.isDuplicate &&
    css`
      background: ${COLORS.grey3};
      pointer-events: none;
    `}
  line-height: 1.5;
  border-bottom: 1px solid ${COLORS.grey3};
  padding: 0.85rem 0;
  text-align: start;
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

const LoadingContainer = styled.div`
  text-align: center;
`;
