import { createContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import storage from "../api/storage";
const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getCartData = async () => {
      const cartData = await storage.getCartData();
      if (cartData) {
        setCart(cartData.reverse());
      }
    };
    getCartData();
  }, []);

  const addToCart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      // limit the quantity to 10
      if (productExists.quantity < 10) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...productExists, quantity: productExists.quantity + 1 }
              : item
          )
        );

        storage.storeCartData(
          cart.map((item) =>
            item.id === product.id
              ? { ...productExists, quantity: productExists.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      storage.storeCartData([...cart, { ...product, quantity: 1 }]);

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
    storage.storeCartData(newCart);

    toast.show("Removed from cart", {
      type: "success",
      placement: "top",
      duration: 700,
    });
  };

  const increaseQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      // limit the quantity to 10
      if (productExists.quantity < 10) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...productExists, quantity: productExists.quantity + 1 }
              : item
          )
        );

        storage.storeCartData(
          cart.map((item) =>
            item.id === product.id
              ? { ...productExists, quantity: productExists.quantity + 1 }
              : item
          )
        );
      }
    }
  };

  const decreaseQuantity = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
      storage.storeCartData(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...productExists, quantity: productExists.quantity - 1 }
            : item
        )
      );

      storage.storeCartData(
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
