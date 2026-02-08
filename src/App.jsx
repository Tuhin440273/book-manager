import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Subjects from './pages/Subjects';
import './App.css';

// Navbar active class হ্যান্ডেল করার জন্য আলাদা কম্পোনেন্ট
const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary)'}}>
        📚 BookManager
      </div>
      <div className="nav-links">
        <Link 
          to="/books" 
          className={location.pathname.includes('/books') ? 'active' : ''}
        >
          Search
        </Link>
        <Link 
          to="/subjects" 
          className={location.pathname.includes('/subjects') ? 'active' : ''}
        >
          Browse Subjects
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;