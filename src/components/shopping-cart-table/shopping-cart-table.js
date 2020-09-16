import React from 'react';
import { connect } from 'react-redux';

import { bookAddedToCart, bookRemovedFromCart, allBooksRemovedFromCart } from '../../actions';
import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
    const renderRow = (item, idx) => {
        const { id, title, count, price, total } = item;
        return (
            <tr key={id}>
                <td>{idx + 1}</td>
                <td className="left">{title}</td>
                <td>{count}</td>
                <td>${price}</td>
                <td>${total}</td>
                <td>
                    <button
                        onClick={() => onIncrease(id)}
                        className="btn btn-outline-success btn-sm">
                            <i className="fa fa-plus-circle" />
                    </button>
                    <button
                        onClick={() => onDecrease(id)}
                        className="btn btn-outline-warning btn-sm">
                            <i className="fa fa-minus-circle" />
                    </button>
                    <button 
                        onClick={() => onDelete(id)}
                        className="btn btn-outline-danger btn-sm">
                            <i className="fa fa-trash-o" />
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    { items.map(renderRow) }
                </tbody>
            </table>

            <div className="total">
                Total: ${total}
            </div>
        </div>
    )
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
    return {
        items: cartItems,
        total: orderTotal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrease: (id) => dispatch(bookAddedToCart(id)),
        onDecrease: (id) => dispatch(bookRemovedFromCart(id)),
        onDelete: (id) => dispatch(allBooksRemovedFromCart(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);