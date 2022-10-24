import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";
import CartContext from "../../context/CartContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, deleteFromCart } =
    useContext(CartContext);

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemImage}>
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: "100%", height: "100%", borderRadius: totalSize(1) }}
        />
      </View>
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>$ {item.price}</Text>

        <View style={styles.cartItemQuantity}>
          <Text style={styles.cartItemQuantityText}>
            Quantity: {item.quantity}
          </Text>

          <View style={styles.cartItemQuantityButtons}>
            <Text
              style={[styles.cartItemQuantityButton, styles.increaseQuantity]}
              onPress={() => increaseQuantity(item)}
            >
              +
            </Text>
            <Text
              style={[styles.cartItemQuantityButton, styles.decreaseQuantity]}
              onPress={() => decreaseQuantity(item)}
            >
              -
            </Text>
          </View>

          <Text
            style={styles.cartItemQuantityButton}
            onPress={() => deleteFromCart(item)}
          >
            <MaterialCommunityIcons
              name="delete"
              size={totalSize(2)}
              color={colors.red}
            />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height(2),
  },
  cartItemImage: {
    width: width(30),
    height: height(15),
    borderRadius: 5,
  },
  cartItemDetails: {
    marginLeft: width(5),
  },
  cartItemTitle: {
    fontSize: totalSize(2.2),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
    textTransform: "uppercase",
  },
  cartItemPrice: {
    fontSize: totalSize(2),
    fontFamily: "SFPro-Regular",
    color: colors.inActiveTabBarColor,
  },
  cartItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(1),
  },
  cartItemQuantityText: {
    fontSize: totalSize(1.5),
    fontFamily: "Gilroy-Medium",
    color: colors.primary,
  },
  cartItemQuantityButtons: {
    flexDirection: "row",
    marginLeft: width(2),
  },
  cartItemQuantityButton: {
    fontSize: totalSize(2.8),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
    paddingHorizontal: width(2),
    borderRadius: 5,
  },
  increaseQuantity: {
    marginRight: width(1),
    backgroundColor: colors.lightGreen,
  },
  decreaseQuantity: {
    marginLeft: width(1),
    backgroundColor: colors.lightRed,
  },
});
