import './App.css';
import { Routes, Route } from 'react-router-dom';
import Search from './components/search/search';
import CompanyList from './components/company-list/company-list';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/company" element={<CompanyList />}></Route>
        <Route path="/" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
