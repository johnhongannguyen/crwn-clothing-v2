import { createContext, useState, useEffect } from "react";



const addCartItem = (cartItems, productToAdd) =>{
    // find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity : cartItem.quantity + 1}
            : cartItem
            )
    }
    //return new array with modified cartItems/ new cart item
    return[...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove) =>{
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity == 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // return back cart items with matching cart item with reduced quantity
    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity : cartItem.quantity - 1}
        : cartItem
        );
    
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    cartCount : 0,
    removeItemFromCart: () =>{}
});

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => {
         return  total + cartItem.quantity
        },0)
        setCartCount(newCartCount);
    },[cartItems])

    const addItemToCart =  (productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd))
    }
    const removeItemFromCart = (cartItemToRemove) =>{
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
        if(cartItems === []) return null
    }

    const value = {isCartOpen,setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}