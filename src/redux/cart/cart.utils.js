export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === cartItemToRemove.id) {
            if (cartItems[i].quantity == 1) {
                return cartItems.filter(item => item.id !== cartItemToRemove.id);
            } else {
                cartItems[i] = { ...cartItems[i], quantity: Number(cartItems[i].quantity) - 1 };
                break;
            }
        }
    }
    return [...cartItems];

    // const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // if (existingCartItem.quantity === 1) {
    //     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    // }

    // return cartItems.map(cartItem =>
    //     cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    // );
};
