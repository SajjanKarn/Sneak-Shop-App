import { StyleSheet, Text, TextInput, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/colors";

export default function Input({
  icon = <AntDesign name="user" size={20} color={colors.grey} />,
  placeholder = "Enter your email",
  keyboardType = "default",
  secureTextEntry = false,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>{icon}</View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: height(7),
    backgroundColor: "#F2F2F2",
    borderRadius: totalSize(3),
    paddingHorizontal: width(5),
    marginTop: height(3),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    marginRight: width(2),
  },
  input: {
    flex: 1,
    fontFamily: "SFPro-Regular",
    fontSize: totalSize(2),
  },
});
