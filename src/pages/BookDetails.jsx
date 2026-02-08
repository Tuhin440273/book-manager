import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://openlibrary.org/works/${id}.json`)
      .then(res => setBook(res.data));
  }, [id]);

  if (!book) return <div className="container">Loading details...</div>;

  const coverUrl = book.covers 
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` 
    : 'https://via.placeholder.com/300x450?text=No+Cover';

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn-details" style={{marginBottom: '20px'}}>
        ← Back to Results
      </button>
      
      <div style={{
        display: 'flex', 
        flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
        gap: '40px',
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <img src={coverUrl} alt={book.title} style={{maxWidth: '300px', borderRadius: '10px', width: '100%'}} />
        
        <div>
          <h1 style={{marginTop: 0}}>{book.title}</h1>
          <p><strong>First Published:</strong> {book.first_publish_date || 'N/A'}</p>
          <p><strong>Description:</strong> {book.description?.value || book.description || "No description provided."}</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px'}}>
             {book.subjects?.slice(0, 5).map(s => (
               <span key={s} style={{background: '#e2e8f0', padding: '5px 10px', borderRadius: '5px', fontSize: '12px'}}>{s}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;