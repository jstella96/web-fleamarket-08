import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      not found
      <Link to="/">홈으로 이동</Link>
    </div>
  );
}
