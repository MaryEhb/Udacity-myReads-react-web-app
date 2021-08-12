import React from "react";
import {Link} from "react-router-dom";
import Shelf from "./Shelf";
import PropTypes from "prop-types";

const ShelvesView = (props) => {
  const {books, addBook} = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>
          <span>My</span>Reads
        </h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            id="currentlyReading"
            title="Currently Reading"
            books={books.filter((book) => book.shelf === "currentlyReading")}
            addBook={addBook}
          />

          <Shelf
            id="wantToRead"
            title="Want to Read"
            books={books.filter((book) => book.shelf === "wantToRead")}
            addBook={addBook}
          />

          <Shelf
            id="read"
            title="Read"
            books={books.filter((book) => book.shelf === "read")}
            addBook={addBook}
          />
        </div>
      </div>

      <Link className="open-search" to="/search">
        Add a book
      </Link>

      <footer>
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/mariem-ehab-1431301b3"
          target="_blank"
        >
          Mary.E{" "}
        </a>
        For{" "}
        <a href="https://www.udacity.com/" target="_blank">
          Udacity
        </a>{" "}
        Nanodegree Certificate
      </footer>
    </div>
  );
};

ShelvesView.propTypes = {
  books: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired,
};

export default ShelvesView;
