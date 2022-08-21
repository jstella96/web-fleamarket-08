import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
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

  useEffect(() => {
    const initUser = async () => {
      const { data } = await api.checkLogin();
      setUser(data);
    };

    initUser();
  }, [setUser]);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="" element={<Unauthorized />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/category" element={<Category />} />
        <Route path="/region" element={<Region />} />
        <Route path="/write" element={<Write />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/chat/:id" element={<ChatContent />} /> */}
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
