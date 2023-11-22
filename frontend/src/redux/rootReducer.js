const initialState = {
    loading: false,
    cartItems: []
}

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case "UPDATE_CART":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quentity: action.payload.quentity }
                        : item
                )
            };

        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) =>
                    item._id !== action.payload._id
                )
            }

        default:
            return state
    }

}