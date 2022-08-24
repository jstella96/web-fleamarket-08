import api from 'src/api';
import { putImage } from 'src/api/aws';
import { Close, Image } from 'src/assets/icons';
import COLORS from 'src/constants/colors';
import styled from 'styled-components';

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
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageUrls.length === MAX_IMAGE) return;
    const uploadInfo = await api.getSignedUrl();
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    await putImage(uploadInfo.data.signedUrl, target.files[0]);
    setImageUrls((prev: string[]) => [
      ...prev,
      `${S3_BUCKET_URL}${uploadInfo.data.fileName}`,
    ]);
  };

  const deleteFile = (index: number) => {
    setImageUrls((prev: string[]) => [
      ...prev.filter(
        (fileName: string, fileIndex: number) => index !== fileIndex
      ),
    ]);
  };

  return (
    <Container>
      <Box>
        <UploadBox>
          <label>
            <input
              type="file"
              onChange={handleUploadFile}
              accept=".jpg, .jpeg, .png"
            />
            <Image></Image>
            <span>{`${imageUrls.length}/${MAX_IMAGE}`}</span>
          </label>
        </UploadBox>
      </Box>
      {imageUrls.map((imageUrl, index) => (
        <Box key={imageUrl}>
          <CloseWrapper onClick={() => deleteFile(index)}>X</CloseWrapper>
          <ImageBox>
            <UploadImage src={imageUrl}></UploadImage>
            {index === 0 && <PrimaryTag>대표사진</PrimaryTag>}
          </ImageBox>
        </Box>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  bottom: 0;
  width: 100%;
  position: absolute;
  background: ${COLORS.titleActive};
  color: ${COLORS.offWhite};
  text-align: center;
  font-size: 0.825rem;
  opacity: 0.8;
  border-radius: 0 0 0.5rem 0.5rem;
`;
const UploadImage = styled.img`
  width: 100%;
`;
const ImageBox = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
`;
