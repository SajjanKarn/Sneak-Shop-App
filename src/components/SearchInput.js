import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";

export default function SearchInput({
  placeholder = "Search for brand or product name...",
  onChangeText,
  value,
  style,
  ...otherProps
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={[styles.input, style]}
        {...otherProps}
      />
      <View style={styles.searchIcon}>
        <AntDesign name="search1" size={20} color={colors.black} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height(7),
    backgroundColor: colors.white,
    borderRadius: totalSize(0.5),
    flexDirection: "row",
    alignItems: "center",
    padding: height(1.5),
    borderColor: "#E6E6E6",
    borderWidth: 1.3,
  },
  input: {
    flex: 1,
    fontSize: totalSize(1.8),
    color: colors.black,
    fontFamily: "SFPro-Regular",
  },
  searchIcon: {
    marginLeft: width(0.5),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
