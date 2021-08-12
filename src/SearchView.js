import React, {Component} from "react";
import {Link} from "react-router-dom";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchView extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    addBook: PropTypes.func.isRequired,
  };

  state = {
    query: "",
    searchBooks: [],
  };

  UNSAFE_componentWillUpdate() {
    this.getSearchedBooks();
  }

  // method called when the view renders (after the state)
  getSearchedBooks = () => {
    BooksAPI.search(this.state.query).then((books) => {
      if (!books || books.error) {
        this.setState(() => ({
          searchBooks: [],
        }));
      } else {
        for (let book of books) {
          book.shelf = "none";
        }

        for (let book of books) {
          for (let myBook of this.props.books) {
            if (book.id === myBook.id) {
              book.shelf = myBook.shelf;
            }
          }
        }

        this.setState(() => ({
          searchBooks: books,
        }));
      }
    });
  };

  handleInputChange = (value) => {
    this.setState(() => ({
      query: value,
    }));

    if (value === "") {
      this.setState(() => ({
        searchBooks: [],
      }));
    }
  };

  clearQuery = () => {
    this.handleInputChange("");
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={this.clearQuery}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => {
                this.handleInputChange(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Shelf
            id="search"
            title="Search result"
            addBook={this.props.addBook}
            books={this.state.searchBooks}
          />
        </div>
      </div>
    );
  }
}

export default SearchView;
