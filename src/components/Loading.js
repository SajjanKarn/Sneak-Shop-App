import { StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import colors from "../../config/colors";
import { totalSize } from "react-native-dimension";

export default function LoadingComponent({ size }) {
  return (
    <View style={styles.container}>
      <Lottie
        autoPlay
        loop
        source={require("../../assets/animations/loader.json")}
        style={[styles.loader, { width: size, height: size }]}
      />
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
    width: totalSize(15),
    height: totalSize(15),
  },
});
