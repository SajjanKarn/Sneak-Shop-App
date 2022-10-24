import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";
import CartContext from "../../../context/CartContext";
import CartItem from "../../components/CartItem";

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length > 0 ? (
        <>
          <View style={styles.cartContainer}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </View>

          <View style={styles.cartTotal}>
            <Text style={styles.cartTotalText}>Total</Text>
            <Text style={styles.cartTotalPrice}>
              ${" "}
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.white,
  },

  // empty cart
  emptyCart: {
    fontSize: totalSize(2.2),
    color: colors.inActiveTabBarColor,
    textAlign: "center",
    fontFamily: "SFPro-Medium",
  },

  title: {
    fontSize: totalSize(3),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
    marginTop: height(2),
  },

  cartContainer: {
    marginTop: height(2),
  },

  cartTotal: {
    marginTop: height(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartTotalText: {
    fontSize: totalSize(2.5),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
  },
  cartTotalPrice: {
    fontSize: totalSize(2.5),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
  },
});
