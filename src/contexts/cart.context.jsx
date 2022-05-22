import { createContext, useEffect, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (existingCartItem) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    };

    return [...cartItems]
};


const decreaseQuantity = (cartItems, productToChange) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToChange.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToChange.id)
    };

    return cartItems.map((cartItem) => cartItem.id === productToChange.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
};

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

// as the actual value you want to access
export const CartContext = createContext({
    setIsCartOpen: () => { },
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    decreaseItemQuantity: () => { },
})

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
        }
        ))

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems);
    };

    const decreaseItemQuantity = (productToChange) => {
        const newCartItems = decreaseQuantity(cartItems, productToChange)
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        cartTotal,
        decreaseItemQuantity,
        removeItemFromCart,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
