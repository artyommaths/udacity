import React, { Component } from 'react';
import BookList from "./BookList";

class Shelf extends Component {

    shelfNameToTitle = {
        wantToRead: 'Want To Read',
        read: 'Read',
        currentlyReading: 'Currently Reading'
    };

    render() {
        const { shelfName, books, onMoveBook } = this.props;

        return (
            <div className='book-shelves'>
                <div key='currentlyReading'>
                    <div className='book-shelf-title'>
                        {this.shelfNameToTitle[shelfName]}
                    </div>
                    <hr />
                    <BookList
                        onMoveBook={onMoveBook}
                        books={books}
                    />
                </div>
            </div>
        )
    }
}

export default Shelf