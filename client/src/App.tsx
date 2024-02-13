import MainPage from './views/MainPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ApplicationReview from './views/ApplicationReview';
import AuthorizedPages from './views/AuthorizedPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/authorize" element={<AuthorizedPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
