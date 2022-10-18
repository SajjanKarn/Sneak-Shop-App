import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Change Password</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Current Password"
          style={styles.input}
          placeholderTextColor={colors.grey}
          icon={<AntDesign name="lock" size={20} color={colors.grey} />}
          secureTextEntry
        />
        <Input
          placeholder="New Password"
          style={styles.input}
          placeholderTextColor={colors.grey}
          icon={<AntDesign name="lock" size={20} color={colors.grey} />}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          style={styles.input}
          placeholderTextColor={colors.grey}
          icon={<AntDesign name="lock" size={20} color={colors.grey} />}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button>Change Password</Button>
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
