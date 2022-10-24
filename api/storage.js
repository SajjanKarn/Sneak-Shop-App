import AsyncStorage from "@react-native-async-storage/async-storage";

const storeCartData = async (cartData) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cartData));
  } catch (error) {
    console.log(error);
  }
};

const getCartData = async () => {
  try {
    const cartData = await AsyncStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : null;
  } catch (error) {
    console.log(error);
  }
};

const removeCartData = async () => {
  try {
    await AsyncStorage.removeItem("cart");
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeCartData,
  getCartData,
  removeCartData,
};
