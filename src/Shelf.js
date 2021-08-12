import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.id}>
              <Book book={book} addBook={props.addBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  addBook: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};

export default Shelf;
