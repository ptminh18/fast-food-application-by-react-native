import { CartItem, Product } from "../types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {
        // if already in cart, imcrement quantity

        const existingItem = items.find(
            item => item.product === product && item.size
        );

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        console.log(product);
        const newCartItem: CartItem = {
            id: randomUUID(), // generate
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items]);

    }

// update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(items.map(item => 
            item.id !== itemId 
                ? item : 
                { ...item, quantity: item.quantity + amount }
            ).filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider 
            value={{ items, addItem, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);