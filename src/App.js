import React, { Component } from "react";
import { Route } from "react-router-dom";
import SearchView from "./SearchView";
import * as BooksAPI from "./BooksAPI";
import ShelvesView from "./ShelvesView";
import "./App.css";

class BooksApp extends Component {
  state = {
    books: [],
  };

  //Get all of my books when the page loads for the first time
  UNSAFE_componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  // method that will add the selected book to the selected shelf
  addBook = (shelf, book) => {
    //update my books in the backend
    BooksAPI.update(book, shelf).then(() => {
      //then update them in the frontend
      const prevBooks = this.state.books;
      const booksIds = prevBooks.map((currentBook) => currentBook.id);
      let NewBooks = [];

      if (booksIds.includes(book.id)) {
        NewBooks = prevBooks.map((currentBook) =>
          currentBook.id === book.id ? { ...currentBook, shelf } : currentBook
        );
      } else {
        book.shelf = shelf;
        NewBooks = [...prevBooks, book];
      }

      this.setState(() => ({
        books: NewBooks,
      }));
    });
  };

  render() {
    return (
      <div className="app">
        {/* shelves page */}
        <Route
          exact
          path="/"
          render={() => (
            <ShelvesView books={this.state.books} addBook={this.addBook} />
          )}
        />

        {/* search page */}
        <Route
          path="/search"
          render={() => (
            <SearchView books={this.state.books} addBook={this.addBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
