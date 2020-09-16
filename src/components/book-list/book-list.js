import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

class BookList extends Component {

    componentDidMount() {
        const {
            bookstoreService,
            booksLoaded,
            booksRequested,
            booksError } = this.props;

        booksRequested();
        bookstoreService.getBooks()
            .then((data) => booksLoaded(data))
            .catch((error) => {
                booksError(error);
                console.log(error);
            });
    }
    
    render() {
        const { books, loading, error } = this.props;
        console.log(books);
        console.log(loading);
        console.log(error);
        if (loading) {
            return <Spinner />;
        }

        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}>
                                <BookListItem book={book}/>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
};

const mapStateToProps = ({ books, loading, error }) => {
    return {
        books,
        loading,
        error
    };
};

const mapDispatchToProps = {
    booksLoaded,
    booksRequested,
    booksError
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);