const initialState = {
    books: [],
    loading: false,
    error: null,
    cartItems: [],
    orderTotal: 50
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
        case 'BOOK_ADDED_TO_CART':
            const bookId = action.payload;
            const book = state.books.find((book) => book.id === bookId)
            const {id, title, price} = book;
            const newItem = {id, title, price, count: 1}
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    newItem
                ]
            };
        default:
            return state;
    }
};

export default reducer;