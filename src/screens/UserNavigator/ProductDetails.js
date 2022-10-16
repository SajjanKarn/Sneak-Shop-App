import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

export default function ProductDetails() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerNavigator}>
          <View style={styles.backIcon}>
            <AntDesign
              name="arrowleft"
              size={25}
              color={colors.primary}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.headerText}>Product Details</Text>
          <AntDesign name="hearto" size={25} color={colors.primary} />
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
          />

          <View style={styles.productImageChoice}>
            <Image
              style={styles.productImageChoiceImage}
              source={{
                uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
            />
            <Image
              style={styles.productImageChoiceImage}
              source={{
                uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
            />
            <Image
              style={styles.productImageChoiceImage}
              source={{
                uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
            />
            <Image
              style={styles.productImageChoiceImage}
              source={{
                uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
            />
          </View>

          <View style={styles.productDetails}>
            <Text style={styles.productName}>Nike Air Max 270</Text>
            <Text style={styles.productPrice}>$100</Text>

            <View style={styles.productDescription}>
              <Text style={styles.productDescriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue. Donec id elit non mi porta
                gravida at eget metus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nulla vitae elit libero, a pharetra augue.
                Donec id elit non mi porta gravida at eget metus. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Nulla vitae elit
                libero, a pharetra augue. Donec id elit non mi porta gravida at
                eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nulla vitae elit libero, a pharetra augue. Donec id elit
                non mi porta gravida at eget metus. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nulla vitae elit libero, a pharetra
                augue. Donec id elit non mi porta gravida at eget metus. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
                elit libero, a pharetra augue. Donec id elit non mi porta
                gravida at eget metus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nulla vitae elit libero, a pharetra augue.
                Donec id elit non mi porta gravida at eget metus. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Nulla vitae elit
                libero, a pharetra augue. Donec id elit non mi porta gravida at
                eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nulla vitae elit libero, a pharetra augue. Donec id elit
                non mi porta gravida at eget metus. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nulla vitae elit libero, a pharetra
                augue. Donec id elit non mi porta gravida at eget metus.
              </Text>
            </View>
          </View>

          <View style={styles.productSize}>
            <Text style={styles.productSizeText}>Size</Text>
            <View style={styles.productSizeChoice}>
              <Text style={styles.productSizeChoiceText}>5</Text>
              <Text style={styles.productSizeChoiceText}>6</Text>
              <Text style={styles.productSizeChoiceText}>7</Text>
              <Text style={styles.productSizeChoiceText}>8</Text>
              <Text style={styles.productSizeChoiceText}>9</Text>
              <Text style={styles.productSizeChoiceText}>10</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.productCheckout}>
        <View style={styles.productPriceCheckout}>
          <Text style={styles.productPriceTitle}>Price</Text>
          <Text style={styles.productPriceText}>$599</Text>
        </View>
        <View style={styles.productCheckoutButton}>
          <Button>Add To Cart</Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width(5),
  },
  headerNavigator: {
    paddingVertical: height(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: totalSize(2.1),
    color: colors.primary,
    fontFamily: "Gilroy-Bold",
    textTransform: "uppercase",
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: height(40),
    resizeMode: "contain",
    borderRadius: totalSize(1),
  },
  productImageChoice: {
    flexDirection: "row",
    marginTop: height(2),
  },
  productImageChoiceImage: {
    width: width(15),
    height: height(7),
    resizeMode: "contain",
    borderRadius: 5,
    marginRight: width(2),
  },
  productDetails: {
    marginTop: height(2),
  },
  productName: {
    fontSize: totalSize(3),
    color: colors.primary,
    fontFamily: "Gilroy-Bold",
    textTransform: "uppercase",
  },
  productPrice: {
    fontSize: totalSize(2),
    color: colors.inActiveTabBarColor,
    fontFamily: "SFPro-Medium",
  },
  productDescription: {
    marginTop: height(2),
  },
  productDescriptionText: {
    fontSize: totalSize(2),
    color: colors.inActiveTabBarColor,
    fontFamily: "SFPro-Light",
  },

  productSize: {
    marginTop: height(2),
    paddingBottom: height(2),
  },
  productSizeText: {
    fontSize: totalSize(2.2),
    color: colors.primary,
    fontFamily: "Gilroy-Bold",
  },
  productSizeChoice: {
    flexDirection: "row",
    marginTop: height(1.5),
  },
  productSizeChoiceText: {
    width: width(10),
    height: width(10),
    borderRadius: width(5),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: totalSize(1.7),
    color: colors.inActiveTabBarColor,
    fontFamily: "SFPro-Light",
    marginRight: width(2),
    borderWidth: 1,
    borderColor: colors.inActiveTabBarColor,
  },

  productCheckout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: height(2),
    paddingHorizontal: width(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,

    bottom: 0,
    left: 0,
    right: 0,
  },
  productPriceCheckout: {
    flex: 0.7,
  },
  productPriceTitle: {
    fontSize: totalSize(2),
    color: colors.inActiveTabBarColor,
    fontFamily: "SFPro-Light",
  },
  productPriceText: {
    fontSize: totalSize(2.3),
    color: colors.primary,
    fontFamily: "Gilroy-Bold",
  },
  productCheckoutButton: {
    flex: 1,
  },
});
