const initialState = {
    books: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'BOOKS_LOADED':
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case 'BOOKS_REQUESTED':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'BOOKS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;