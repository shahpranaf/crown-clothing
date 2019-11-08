import { cartActionTypes } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    items: []
};
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.TOGGLE_CART_DROPDOWN: {
            return {
                ...state,
                hidden: !state.hidden
            };
        }
        case cartActionTypes.ADD_ITEM: {
            return {
                ...state,
                items: addItemToCart(state.items, action.payload)
            };
        }
        case cartActionTypes.CLEAR_ITEM_FROM_CART: {
            return {
                ...state,
                items: state.items.filter(cartItem => cartItem.id !== action.payload.id)
            };
        }
        case cartActionTypes.REMOVE_ITEM: {
            return {
                ...state,
                items: removeItemFromCart(state.items, action.payload)
            };
        }
        case cartActionTypes.CLEAR_CART: {
            return {
                ...state,
                items: []
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
