import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";

export default function Button({
  children = "Click Here",
  backgroundColor = colors.primary,
  color = colors.white,
  fontSize = totalSize(1.8),
  onPress = () => {},
  marginTop = null,
  loading = false,
}) {
  if (loading) {
    return (
      <View style={styles.loadingButton}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { backgroundColor, marginTop: marginTop ? marginTop : 0 },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color, fontSize }]}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  loadingButton: {
    backgroundColor: colors.inActiveTabBarColor,
    width: "100%",
    height: height(7),
    borderRadius: totalSize(3),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: height(7),
    borderRadius: totalSize(3),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "SFPro-Medium",
    color: colors.white,
  },
});
