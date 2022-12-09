import { Route, Routes } from 'react-router-dom';
import EndPage from './pages/End/EndPage';
import MainPage from './pages/Main/MainPage';
import MainConfigsPage from './pages/MainConfigsPage/MainConfigsPage';
import PasswordPage from './pages/Password/PasswordPage';
import PlayBookPage from './pages/PlayBook/PlayBookPage';
import SelectTemplatePage from './pages/SelectTemplate/SelectTemplate';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main_configs/:type" element={<MainConfigsPage />} />
      <Route path="/playbook" element={<PlayBookPage />} />
      <Route path="/security" element={<SelectTemplatePage />} />
      <Route path="/password" element={<PasswordPage />} />
      <Route path="/end" element={<EndPage />} />
    </Routes>
  );
};

export default App;
