import { Link } from 'react-router-dom';
import { Check } from 'src/assets/icons';
import Header from 'src/components/common/Header';

export default function Write() {
  return (
    <>
      <Header
        title="글쓰기"
        rightButton={
          <Link to="/">
            <Check />
          </Link>
        }
      />
    </>
  );
}
