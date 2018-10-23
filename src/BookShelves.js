import React, { Component } from 'react';
import * as _ from "lodash";
import Shelf from "./Shelf";
import { Link } from 'react-router-dom';

class BookShelves extends Component {

    render() {
        const { books, onMoveBook } = this.props;

        const shelves = _.chain(books)
            .groupBy('shelf')
            .value();

        return (
            <div>
                <div className='main-title'>
                    MyReads
                </div>
                <Shelf
                    shelfName={'currentlyReading'}
                    books={shelves['currentlyReading']}
                    onMoveBook={onMoveBook}
                />
                <Shelf
                    shelfName={'read'}
                    books={shelves['read']}
                    onMoveBook={onMoveBook}
                />
                <Shelf
                    shelfName={'wantToRead'}
                    books={shelves['wantToRead']}
                    onMoveBook={onMoveBook}
                />
                <Link to='/search'>
                    <i className="search-button fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                </Link>
            </div>
        )
    }
}

export default BookShelves