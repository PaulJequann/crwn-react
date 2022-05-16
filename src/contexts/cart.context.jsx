import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if (existingCartItem) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    return [...cartItems]
}


const decreaseQuantity = (cartItems, productToChange) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToChange.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToChange.id)
    }
    return cartItems.map((cartItem) => cartItem.id === productToChange.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}

// as the actual value you want to access
export const CartContext = createContext({
    setIsCartOpen: () => { },
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    decreaseItemQuantity: () => {},
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const decreaseItemQuantity = (productToChange) => {
        setCartItems(decreaseQuantity(cartItems, productToChange))
    }

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
