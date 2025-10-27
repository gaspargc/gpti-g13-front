import './App.css'
import { TagPoolDemoStyled}  from './UI_alternatives/TagPool/TagPoolDemoStyled'
import { MenuDemoView } from './UI_alternatives/planning/MenuDemoView'
import LoadingView from './UI_alternatives/loading/LoadingView'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TagPoolDemoStyled />} />
        <Route path="/loading" element={<LoadingView />} />
        <Route path="/menu-final" element={<MenuDemoView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;