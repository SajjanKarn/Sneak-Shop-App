import { StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import colors from "../../config/colors";
import { totalSize } from "react-native-dimension";

export default function LoadingComponent() {
  return (
    <View style={styles.container}>
      <Lottie
        autoPlay
        loop
        source={require("../../assets/animations/loader.json")}
        style={styles.loader}
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
    width: totalSize(25),
    height: totalSize(25),
  },
});
