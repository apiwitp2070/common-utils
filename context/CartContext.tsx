"use client";

import { ProductInterface } from "@/interfaces/product";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { toast } from "sonner";

type CartItem = ProductInterface;

interface CartContextType {
  cartItems: CartItem[];
  cartLength: number;
  total: number;
  totalCheckout: number;
  checkoutItems: CartItem[]; // for single product instant checkout
  buyNow: (item: CartItem | CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCheckoutItems: (items?: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  const total = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.price, 0);
  }, [cartItems]);

  const totalCheckout = useMemo(() => {
    return checkoutItems.reduce((acc, curr) => acc + curr.price, 0);
  }, [checkoutItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCarts = localStorage.getItem(CART_KEY);
      const carts = localCarts ? JSON.parse(localCarts) : [];

      if (!Array.isArray(carts)) {
        toast.error(
          "Encountered invalid data. The cart will be cleared. Please add item to the cart again."
        );
        localStorage.removeItem(CART_KEY);
        setCartItems([]);
      } else {
        setCartItems(carts);
      }
    }
  }, []);

  const buyNow = useCallback(
    (item: CartItem | CartItem[]) => {
      if (!Array.isArray(item)) {
        setCheckoutItems([item]);
      } else {
        setCheckoutItems(item);
      }

      router.push("/checkout");
    },
    [router]
  );

  const addToCart = useCallback((newItem: CartItem) => {
    setCartItems((prev) => {
      const isDuplicate = prev.some((item) => item.id === newItem.id);

      if (isDuplicate) {
        toast.info("Item already in cart.");
        return prev;
      }

      const updated = [...prev, newItem];
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      toast.success("Item added to cart.");
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCheckoutItems = useCallback((newItems?: CartItem[]) => {
    if (newItems?.length) {
      setCartItems((prev) => {
        const updated = prev.filter(
          (item) => !newItems.some((item2) => item2.id === item.id)
        );
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
        return updated;
      });
    } else {
      setCartItems([]);
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    }

    setCheckoutItems([]);
  }, []);

  const value = {
    cartItems,
    cartLength: cartItems.length,
    total,
    totalCheckout,
    checkoutItems,
    buyNow,
    addToCart,
    removeFromCart,
    clearCheckoutItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
