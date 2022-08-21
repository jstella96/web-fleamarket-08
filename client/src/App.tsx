import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import TransitionLayout from './components/Slider/TransitionLayout';
import { useEffect } from 'react';
import api from './api';
import Unauthorized from './components/Unauthorized';
import Category from './pages/Category';
import Chat from './pages/Chat';
import ChatContent from './pages/ChatContent';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Region from './pages/Region';
import Write from './pages/Write';
import { userState } from './recoil/atoms/user';

function App() {
  const setUser = useSetRecoilState(userState);
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  
  useEffect(() => {
    const initUser = async () => {
      const { data } = await api.checkLogin();
      setUser(data);
    };

    initUser();
  }, [setUser]);

  return (
     <RecoilRoot>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Unauthorized />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/region" element={<Region />} />
          <Route path="/write" element={<Write />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<ChatContent />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="" element={<TransitionLayout />}>
            <Route path="/category" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      )}
    </RecoilRoot>
  );
}

export default App;
