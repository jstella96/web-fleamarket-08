import { useState } from 'react';
import api from 'src/api';
import { putImage } from 'src/api/aws';
import { Image } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import { flexRow, FlexboxRow, absoluteBottom } from 'src/styles/common';
import styled from 'styled-components/macro';
import ImageLoading from './ImageLoading';

interface ImageUpaloderProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const MAX_IMAGE = 10;
const S3_BUCKET_URL =
  'https://web-fleamarket-08.s3.ap-northeast-2.amazonaws.com/';
export default function ImageUploader({
  imageUrls,
  setImageUrls,
}: ImageUpaloderProps) {
  const [lodingImageCount, setLodingImageCount] = useState(0);
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const fileList = Array.from(target.files || []);

    if (!fileList) return;
    if (fileList.length + imageUrls.length > MAX_IMAGE) {
      return alert('10개 이상의 파일을 업로드 할 수 없습니다.');
    }
    setLodingImageCount(fileList.length);
    const fileNames = fileList.map((file) => file.name);
    const { data } = await api.getSignedUrls(fileNames);

    data.forEach(async (AwsUploadInfo, index) => {
      await putImage(AwsUploadInfo.signedUrl, fileList[index]);
      const fileUrl = `${S3_BUCKET_URL}${AwsUploadInfo.fileName}`;
      setImageUrls((prev) => [...prev, fileUrl]);
      setLodingImageCount((prev) => prev - 1);
    });
  };

  const deleteFile = (index: number) => {
    setImageUrls((prev) => [
      ...prev.filter((fileName, fileIndex) => index !== fileIndex),
    ]);
  };

  const changePrimaryImage = (index: number) => {
    setImageUrls((prev) => [
      prev[index],
      ...prev.filter((fileName, fileIndex) => index !== fileIndex),
    ]);
  };

  return (
    <Container>
      <FlexboxRow>
        <Box>
          <UploadBox>
            <label>
              <input
                type="file"
                onChange={handleUploadFile}
                accept=".jpg, .jpeg, .png"
                multiple
              />
              <Image></Image>
              <span>{`${imageUrls.length}/${MAX_IMAGE}`}</span>
            </label>
          </UploadBox>
        </Box>
        {imageUrls.map((imageUrl, index) => (
          <Box key={imageUrl}>
            <CloseWrapper
              onClick={(e) => {
                e.preventDefault();
                deleteFile(index);
              }}
            >
              X
            </CloseWrapper>
            <ImageBox onClick={() => changePrimaryImage(index)}>
              <UploadImage src={imageUrl}></UploadImage>
              {index === 0 && <PrimaryTag>대표사진</PrimaryTag>}
            </ImageBox>
          </Box>
        ))}
        {new Array(lodingImageCount).fill('').map((_, i) => (
          <Box key={i}>
            <ImageLoading />{' '}
          </Box>
        ))}
      </FlexboxRow>
    </Container>
  );
}

const Container = styled.div`
  ${flexRow}
  overflow-x: auto;
`;

const Box = styled.div`
  display: block;
  width: 5rem;
  height: 5rem;
  margin: 0.75rem;
  background-color: white;
  position: relative;
`;
const CloseWrapper = styled.button`
  background: ${COLORS.titleActive};
  border-radius: 0.75rem;
  padding: 0.2rem;
  right: -0.4rem;
  top: -0.4rem;
  position: absolute;
  width: 1rem;
  height: 1rem;
  font-size: 0.5rem;
  text-align: center;
  color: ${COLORS.offWhite};
  /* svg {
    width: 0.6rem;
    height: 0.6rem;
  } */
`;
const UploadBox = styled.div`
  height: 100%;
  width: 100%;
  & input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  & label {
    border-radius: 0.5rem;
    background-color: ${COLORS.grey3};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
const PrimaryTag = styled.div`
  ${absoluteBottom};
  width: 100%;
  background: ${COLORS.titleActive};
  color: ${COLORS.offWhite};
  text-align: center;
  font-size: 0.825rem;
  opacity: 0.8;
  border-radius: 0 0 0.5rem 0.5rem;
`;
const UploadImage = styled.img`
  width: 100%;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;
const ImageBox = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;
