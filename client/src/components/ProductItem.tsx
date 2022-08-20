import { Link } from 'react-router-dom';

export default function ProductItem() {
  return (
    <Link to="/product/1">
      <h2>상품 이름 - 상품바로가기</h2>
    </Link>
  );
}
