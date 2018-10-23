import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import BookList from "./BookList";
import { Link } from 'react-router-dom';
import Immutable from "immutable";

class SearchBook extends Component {

    state = {
        query: '',
        showingBooks: []
    };

    updateQuery = (query) => {
        this.setState({query: query})
    };

    moveBook = (book, shelf) => {
        this.props.onMoveBook(book, shelf);

        if (book.shelf !== shelf) {

            const indexOfBook = this.state.showingBooks.findIndex(b => b.id === book.id);

            const newBook = Immutable.fromJS(book).setIn(['shelf'], shelf).toJS();

            this.setState((state) => ({
                showingBooks: Immutable.List(state.showingBooks).set(indexOfBook, newBook).toJS()
            }))

        }

    };

    componentDidUpdate (prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            BooksAPI.search(this.state.query).then((response) => {
                console.log(response);
                console.log(prevProps.selectedBooks);

                if (response === undefined || response === null || response.error === 'empty query') {
                    this.setState({ query: this.state.query, showingBooks: [] })
                } else {
                    let res = [];
                    response.forEach(r => {
                            const ind = prevProps.selectedBooks.findIndex(b => b.id === r.id);
                            if (ind !== -1) {
                                res.push(prevProps.selectedBooks[ind]);
                            } else {
                                res.push(r);
                            }
                    });

                    this.setState({ query: this.state.query, showingBooks: res })
                }
            });
        }
    }

    clearQuery = () => {
        this.setState({query: ''})
    };

    render() {
        const { query, showingBooks } = this.state;

        return (
            <div className='list-books-top'>
                <div className='input-group mb-3 search-books'>
                    <div className='input-group-prepend'>
                        <Link className='btn btn-outline-secondary' type='button' to='/'>My Reads</Link>
                    </div>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search by title or author'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                <BookList
                    onMoveBook={this.moveBook}
                    books={showingBooks}
                />
            </div>
        );
    }
}

export default SearchBook