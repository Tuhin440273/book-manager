import { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Subjects = () => {
  const subjects = ['fiction', 'science', 'history', 'romance', 'fantasy', 'mystery', 'thriller', 'biography'];
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState('');

  const loadSubject = async (sub) => {
    setLoading(true);
    setActiveSubject(sub);
    setBooks([]); // আগের ডাটা ক্লিয়ার
    try {
      const res = await axios.get(`https://openlibrary.org/subjects/${sub}.json?limit=12`);
      const formatted = res.data.works.map(b => ({
        key: b.key,
        title: b.title,
        author_name: b.authors.map(a => a.name),
        cover_i: b.cover_id,
        first_publish_year: b.first_publish_year
      }));
      setBooks(formatted);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#374151'}}>Browse by Category</h2>
      
      <div className="subject-list">
        {subjects.map(s => (
          <button 
            key={s} 
            className={`subject-btn ${activeSubject === s ? 'active' : ''}`}
            onClick={() => loadSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && <div style={{textAlign: 'center', padding: '40px'}}>Fetching {activeSubject} books... ⏳</div>}

      <div className="book-grid">
        {books.map(book => <BookCard key={book.key} book={book} />)}
      </div>
    </div>
  );
};

export default Subjects;