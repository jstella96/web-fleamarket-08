import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import api from './api';
import EmptyRegion from './components/auth/EmptyRegion';
import Unauthorized from './components/auth/Unauthorized';
import TransitionLayout from './components/Slider/TransitionLayout';
import Category from './pages/Category';
import Chat from './pages/Chat';
import ChatDetail from './pages/ChatDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Region from './pages/Region';
import Start from './pages/Start';
import Write from './pages/Write';
import { userState } from './recoil/atoms/user';

function App() {
  const setUser = useSetRecoilState(userState);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const initUser = async () => {
      const { data } = await api.getUser();
      setUser(data);
      setIsLoadingUser(false);
    };

    initUser();
  }, [setUser]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Unauthorized isLoadingUser={isLoadingUser} />}>
          <Route path="" element={<EmptyRegion />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Start />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/region" element={<Region />} />
            <Route path="/write" element={<Write />} />
            <Route path="/write/:id" element={<Write />} />
            <Route path="/chat/:productId" element={<Chat />} />
            <Route path="/chat-detail/:productId" element={<ChatDetail />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="" element={<TransitionLayout />}>
            <Route path="/category" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
