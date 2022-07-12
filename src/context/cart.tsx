import { createContext, ReactNode, useContext, useState } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function ShoppingCartProvider(props: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(ShoppingCartContext);
  return context;
}
