const updateCartItems = (cartItems, item, idx) => {
    if (item.count <= 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }    
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }
    return [
            ...cartItems.slice(0, idx),
            item,
            ...cartItems.slice(idx + 1)
        ]
};

const updateCartItem = (book, item = {}, quantity = 1) => {
    const {
        id = book.id,
        title = book.title,
        price = book.price,
        count = 0} = item;
    return {
        id,
        title,
        price,
        total: price * (count + quantity),
        count: count + quantity}
};

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state;
    const indexItem = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[indexItem];
    let book = {};
    
    if (!item && quantity > 0) {
        book = books.find((book) => book.id === bookId);
    }
    const newItem = updateCartItem(book, item, quantity);
    const newCartItem = updateCartItems(cartItems, newItem, indexItem);
    let itemTotal = 0,
        orderTotal = 0;
    newCartItem.forEach(item => {
        itemTotal += item.count;
        orderTotal += item.total;
    });
    return {
        cartItems: newCartItem,
        itemTotal: itemTotal,
        orderTotal: orderTotal
    };
};



const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            itemTotal: 0,
            orderTotal: 0
        }
    };
    switch (action.type) {
        case 'BOOK_ADDED_TO_CART': {
            return updateOrder(state, action.payload, 1);
        }
        case 'BOOK_REMOVED_FROM_CART': {
            return updateOrder(state, action.payload, -1);
        }
        case 'ALL_BOOKS_REMOVED_FROM_CART': {
            const item = state.shoppingCart.cartItems.find((item) => item.id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        }
        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;