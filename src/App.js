import React, { Component } from 'react';
import BookShelves from './BookShelves';
import * as BooksAPI from './utils/BooksAPI';
import Immutable from 'immutable';
import {Route} from 'react-router-dom';
import SearchBook from "./SearchBook";

class App extends Component {
    state = {
        books: []
    };

    componentDidMount () {
        BooksAPI.getAll().then((books) => {
            console.log(books);
            this.setState({books});
        })
    }

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf);

        if (book.shelf !== shelf) {

            const indexOfBook = this.state.books.findIndex(b => b.id === book.id);

            const newBook = Immutable.fromJS(book).setIn(['shelf'], shelf).toJS();

            this.setState((state) => ({
                books: Immutable.List(state.books).set(indexOfBook, newBook).toJS()
            }))

        }

        if (book.shelf === 'none') {

            this.setState((state) => ({
                books: state.books.filter(b => b !== book.title)
            }))

        }
    };

    render() {
        return (
            <div>
                <Route exact path='/' render={() =>
                    <BookShelves
                        books={this.state.books}
                        onMoveBook={this.moveBook}
                    />
                }/>

                <Route exact path='/search' render={() =>
                    <SearchBook
                        onMoveBook={this.moveBook}
                        selectedBooks={this.state.books}
                    />
                }/>
            </div>
        );
    }
}

export default App;
