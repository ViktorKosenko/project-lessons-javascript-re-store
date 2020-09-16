import React from 'react';

import BookListItem from '../book-list-item';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                onAddedToCart={() => onAddedToCart(book.id)}
                                book={book}/>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default BookList;