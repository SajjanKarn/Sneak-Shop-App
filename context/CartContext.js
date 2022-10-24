import { createContext, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...productExists, quantity: productExists.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.show("Added to cart", {
        type: "success",
        placement: "top",
        duration: 700,
      });
    }
  };

  const deleteFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    toast.show("Removed from cart", {
      type: "success",
      placement: "top",
      duration: 700,
    });
  };

  const increaseQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...productExists, quantity: productExists.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...productExists, quantity: productExists.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
