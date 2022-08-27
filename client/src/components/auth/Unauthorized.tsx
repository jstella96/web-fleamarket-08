import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Start from 'src/pages/Start';
import { userState } from 'src/recoil/atoms/user';

interface UnauthorizedProps {
  isLoadingUser: boolean;
}

export default function Unauthorized({ isLoadingUser }: UnauthorizedProps) {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingUser) return;
    if (!user) navigate('/', { replace: true });
  }, [isLoadingUser, navigate, user]);

  if (user) return <>{<Outlet />}</>;
  return <Start />;
}
