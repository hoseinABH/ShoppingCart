import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CartSidebar } from '@components/CartSidbar';
import { useLocalStorage } from '@hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCard: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider(props: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  }

  function increaseQuantity(id: number) {
    setCartItems((prevItems) => {
      if (!prevItems.find((item) => item.id === id)) {
        return [...prevItems, { id, quantity: 1 }];
      } else {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  }

  function decreaseQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id)?.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }
  function openCart() {
    setIsOpen(true);
  }
  function closeCard() {
    setIsOpen(false);
  }

  const cartQuantity = useMemo(
    () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0),
    [cartItems]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCard,
      }}
    >
      {props.children}
      <CartSidebar isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(ShoppingCartContext);
  return context;
}
