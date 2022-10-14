import { Image, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";
import Button from "../components/Button";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circle} />
        <Image
          style={styles.sneakerImage}
          source={require("../../assets/images/sneaker-header.png")}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Great way to lift up your style!</Text>
          <Text style={styles.subInfoText}>
            Complete your style with awesome shoes and sneakers from us
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor={colors.white}
            color={colors.primary}
            onPress={() => navigation.navigate("Login")}
          >
            Get Started
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: width(6),
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  sneakerImage: {
    width: "100%",
    height: height(60),
    transform: [
      { scaleX: -1 },
      { rotate: "-20deg" },
      { translateY: height(5) },
      { translateX: -width(10) },
    ],
  },
  circle: {
    position: "absolute",
    width: totalSize(20),
    height: totalSize(20),
    borderRadius: totalSize(10),
    backgroundColor: colors.white,
    opacity: 0.2,
  },
  footer: {
    flex: 1,
    // marginBottom: height(5),
  },
  infoTextContainer: {
    marginBottom: height(5),
    width: width(80),
    alignSelf: "center",
  },
  infoText: {
    fontFamily: "Gilroy-Bold",
    color: colors.white,
    fontSize: totalSize(5),
    textAlign: "center",
  },
  subInfoText: {
    fontFamily: "SFPro-Light",
    color: colors.white,
    fontSize: totalSize(2),
    textAlign: "center",
    marginTop: height(2),
    marginBottom: height(5),
  },
});
