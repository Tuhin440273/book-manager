import { Link } from "react-router-dom";

function BookCard({ book }) {
  const coverId = book.cover_i;
  const image = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "";

  const workId = book.key.split("/").pop();

  return (
    <div className="book-card">
      {image && <img src={image} alt="" />}
      <h3>{book.title}</h3>
      <p><b>Author:</b> {book.author_name?.join(", ")}</p>
      <p><b>Year:</b> {book.first_publish_year}</p>

      <Link to={`/book/${workId}`}>
        <button style={{ marginTop: "10px" }}>View Details</button>
      </Link>
    </div>
  );
}

export default BookCard;
