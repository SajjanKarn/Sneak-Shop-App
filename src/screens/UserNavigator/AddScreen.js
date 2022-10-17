import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import Input from "../../components/Input";
import Button from "../../components/Button";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Add Product</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Product Name"
          style={styles.input}
          placeholderTextColor={colors.grey}
          icon={<AntDesign name="book" size={20} color={colors.grey} />}
        />
        <Input
          placeholder="Product Price"
          style={styles.input}
          placeholderTextColor={colors.grey}
          keyboardType="numeric"
          icon={<Feather name="dollar-sign" size={20} color={colors.grey} />}
        />
        <Input
          placeholder="Product Description"
          style={styles.input}
          placeholderTextColor={colors.grey}
          multiline
          numberOfLines={4}
          icon={<Entypo name="text" size={20} color={colors.grey} />}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button>Add Product</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(3.5),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
    marginTop: height(2),
  },
  formContainer: {
    marginTop: height(2),
  },
  buttonContainer: {
    marginTop: height(3),
  },
});
