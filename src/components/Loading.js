import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import colors from "../../config/colors";
import { totalSize } from "react-native-dimension";

export default function LoadingComponent({ title }) {
  return (
    <View style={styles.container}>
      <Lottie
        autoPlay
        loop
        source={require("../../assets/animations/loader.json")}
        style={[styles.loader]}
      />

      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: totalSize(25),
    height: totalSize(25),
  },
  title: {
    fontFamily: "Gilroy-Medium",
    fontSize: totalSize(2),
    color: colors.primary,
    marginTop: totalSize(1),
  },
});
