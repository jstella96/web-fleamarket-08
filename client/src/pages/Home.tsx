import { Link } from 'react-router-dom';
import api from 'src/api';
import { Add } from 'src/assets/icons';
import MainHeader from 'src/components/main/MainHeader';
import ProductItem from 'src/components/ProductItem';

export default function Home() {
  const sessionTest = () => {
    api.socialLoginTest();
  };
  return (
    <div>
      <MainHeader />
      <button onClick={sessionTest}>test</button>
      <ProductItem />
      <Link to="/write">
        <Add />
      </Link>
    </div>
  );
}
