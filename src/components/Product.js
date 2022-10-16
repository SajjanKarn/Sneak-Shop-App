import { Image, StyleSheet, Text, View } from "react-native";

import { width, height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";

export default function Product({
  image = "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  title = "Nike Air Max 270",
  price = 100,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{title}</Text>
        <Text style={styles.productPrice}>${price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width(40),
    height: height(35),
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: totalSize(0.5),
  },

  productDetails: {
    width: "100%",
    marginTop: height(1),
  },
  productName: {
    fontSize: totalSize(2.2),
    color: colors.primary,
    fontFamily: "Gilroy-Bold",
  },
  productPrice: {
    fontSize: totalSize(1.7),
    color: "#757575",
    fontFamily: "SFPro-Medium",
  },
});
