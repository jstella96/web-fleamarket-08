import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'src/assets/icons';

interface HeaderProps {
  title: string;
  rightButton?: ReactNode;
}

export default function Header({ title, rightButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header>
      <button onClick={() => navigate(-1)}>
        <ChevronLeft />
      </button>
      <h1>{title}</h1>
      {rightButton}
    </header>
  );
}
