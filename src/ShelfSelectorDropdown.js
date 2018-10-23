import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ShelfSelectorDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { onMoveBook, currentBook } = this.props;

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className='dropdown-button' caret>Move to shelf</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Move to...</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem disabled={currentBook && currentBook.shelf === 'currentlyReading'}
                                  onClick={() => onMoveBook(currentBook, 'currentlyReading')}>Currently Reading</DropdownItem>
                    <DropdownItem disabled={currentBook && currentBook.shelf === 'wantToRead'}
                                  onClick={() => onMoveBook(currentBook, 'wantToRead')}>Want To Read</DropdownItem>
                    <DropdownItem disabled={currentBook && currentBook.shelf === 'read'}
                                  onClick={() => onMoveBook(currentBook, 'read')}>Read</DropdownItem>
                    <DropdownItem disabled={currentBook && currentBook.shelf === undefined}
                                  onClick={() => onMoveBook(currentBook, 'none')}>None</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}