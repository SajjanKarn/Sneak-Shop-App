import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";

export default function Button({
  children = "Click Here",
  backgroundColor = colors.primary,
  color = colors.white,
  fontSize = totalSize(2),
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color, fontSize }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: height(7),
    borderRadius: totalSize(3),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "SFPro-Bold",
    color: colors.white,
    fontSize: totalSize(2),
  },
});
