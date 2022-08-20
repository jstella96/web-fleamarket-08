import { Link } from 'react-router-dom';
import { LogOut } from 'src/assets/icons';
import Header from 'src/components/common/Header';

export default function ChatContent() {
  const partner = 'jstella';
  return (
    <div>
      <Header
        title={partner}
        rightButton={
          <Link to="/chat">
            <LogOut />
          </Link>
        }
      />
    </div>
  );
}
