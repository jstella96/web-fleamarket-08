import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SocialLogin from './pages/SocialLogin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SocialLogin />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
