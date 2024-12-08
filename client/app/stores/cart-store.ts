import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FoodItem = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    quantity: number;
}

interface CartState {
    cart: FoodItem[];
    addToCart: (food: FoodItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (food: FoodItem) => set((state) => {
                const existingItem = state.cart.find(item => item.id === food.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map(item =>
                            item.id === food.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...food, quantity: 1 }] };
            }),

            removeFromCart: (id: string) => set((state) => ({
                cart: state.cart.filter(item => item.id !== id)
            })),

            updateQuantity: (id: string, quantity: number) => set((state) => ({
                cart: state.cart.map(item =>
                    item.id === id
                        ? { ...item, quantity: Math.max(0, quantity) }
                        : item
                ).filter(item => item.quantity > 0)
            })),

            clearCart: () => set({ cart: [] }),

            getTotalPrice: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage',
        }
    )
)

export default useCartStore;