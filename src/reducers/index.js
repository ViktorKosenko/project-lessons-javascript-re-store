const initialState = {
    books: [],
    loading: false,
    error: null,
    cartItems: [],
    orderTotal: 50
};

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
        total = 0,
        count = 0} = item;
    return {
        id,
        title,
        price,
        total: total + price * quantity,
        count: count + quantity}
};

const udateOrder = (state, bookId, quantity) => {
    const { books, cartItems } = state;
    const indexItem = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[indexItem];
    let book = {};
    
    if (!item && quantity > 0) {
        console.log('find book')
        book = books.find((book) => book.id === bookId);
    }

    const newItem = updateCartItem(book, item, quantity);
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, indexItem)
    };
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_BOOKS_REQUESTED':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'BOOK_ADDED_TO_CART': {
            return udateOrder(state, action.payload, 1);
        }
        case 'BOOK_REMOVED_FROM_CART': {
            return udateOrder(state, action.payload, -1);
        }
        case 'ALL_BOOKS_REMOVED_FROM_CART': {
            const item = state.cartItems.find((item) => item.id === action.payload);
            return udateOrder(state, action.payload, -item.count);
        }
        default:
            return state;
    }
};

export default reducer;