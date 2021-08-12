import React from "react";
import PropTypes from "prop-types";

const Book = (props) => {
  const {book, addBook} = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.thumbnail})`
              : "none",
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
            onChange={(e) => {
              addBook(e.target.value, book);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
