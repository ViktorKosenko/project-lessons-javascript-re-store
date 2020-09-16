import React from 'react';
import { Link } from 'react-router-dom';

import './book-list-item.css';

const BookListItem = ({ book }) => {
    const { title, author, price, coverImage, id } = book;

    return (
        <div className="book-list-item">
            <div className="book-cover">
                <img src={coverImage} alt={title}/>
            </div>
            <div className="book-details">
                <Link to={`/${id}`}>
                    <div className="book-title">{title}</div>
                </Link>                
                <div className="book-author">{author}</div>
                <div className="book-price">${price}</div>
                <button className="btn btn-info add-to-cart">Add to cart</button>
            </div>
        </div>
    );
};

export default BookListItem;