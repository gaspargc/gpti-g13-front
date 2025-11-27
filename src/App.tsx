import './App.css'
import { MenuDemoView } from './UI_alternatives/planning/MenuDemoView'
import LoadingView from './UI_alternatives/loading/LoadingView'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Landing';
import Login from "./Login";
import MainView from './views/MainView';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<LoadingView />} />
        <Route path="/menu-final" element={<MenuDemoView />} />
        <Route path="/new_menu" element={<MainView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;