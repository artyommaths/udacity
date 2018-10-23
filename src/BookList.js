import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ShelfSelectorDropdown from "./ShelfSelectorDropdown";

class BookList extends Component {
    render() {
        const { onMoveBook, books } = this.props;

        return (
            <div className='d-flex justify-content-center'>
                <Row>
                    {books && books.length !== 0 && books.map((book) =>
                        <Col className='book-shelf-display' md="1.5" key={book.id}>
                            <img className='book-image' src={book.imageLinks && book.imageLinks.smallThumbnail} alt='Nothing to display' />
                            <ShelfSelectorDropdown
                                onMoveBook={onMoveBook}
                                currentBook={book}
                            />
                            <div className='book-name'>
                                {book.title}
                            </div>
                            <div className='text-muted'>
                                {book.authors && book.authors.map((author) => (
                                    <div key={author}>{author}</div>
                                ))}
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        )
    }
}

export default BookList;