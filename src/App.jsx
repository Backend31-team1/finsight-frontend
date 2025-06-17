import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignupPage from './screens/SignupPage';
import './App.css';

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/signup') return null;
  return (
    <nav className="nav">
      <Link to="/signup" className="nav-link nav-center">회원가입</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
