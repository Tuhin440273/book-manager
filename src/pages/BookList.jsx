import { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchBooks = async () => {
    if (!title && !author) return; 
    setLoading(true);
    setHasSearched(true);
    
    let url = `https://openlibrary.org/search.json?limit=12`;
    if (title) url += `&title=${title}`;
    if (author) url += `&author=${author}`;
    
    try {
      const res = await axios.get(url);
      setBooks(res.data.docs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const clearSearch = () => {
    setTitle('');
    setAuthor('');
    setBooks([]);
    setHasSearched(false);
  };

  return (
    <div>
      <div className="search-container">
        <h2 className="search-title">Find Your Next Book</h2>
        <div className="search-inputs">
          <input 
            placeholder="Book Title (e.g. Harry Potter)" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && fetchBooks()}
          />
          <input 
            placeholder="Author Name (e.g. J.K. Rowling)" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && fetchBooks()}
          />
          <button className="btn btn-primary" onClick={fetchBooks}>Search</button>
          <button className="btn btn-secondary" onClick={clearSearch}>Clear</button>
        </div>
      </div>

      {loading && <div style={{textAlign: 'center', fontSize: '1.2rem', padding: '40px'}}>Searching library... ⏳</div>}
      
      {!loading && hasSearched && books.length === 0 && (
        <div style={{textAlign: 'center', color: '#666'}}>No books found. Try a different search.</div>
      )}

      <div className="book-grid">
        {books.map(book => <BookCard key={book.key} book={book} />)}
      </div>
    </div>
  );
};

export default BookList;