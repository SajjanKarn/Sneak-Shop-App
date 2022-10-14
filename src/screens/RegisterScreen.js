import { StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Input from "../components/Input";

import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/colors";
import Button from "../components/Button";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.formContainer}>
        <Input placeholder="Sajjan Karna" />
        <Input placeholder="abc@example.com" keyboardType="email-address" />
        <Input
          icon={<AntDesign name="lock" size={20} color={colors.grey} />}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
        />
        <Input
          icon={<AntDesign name="lock" size={20} color={colors.grey} />}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <Button>Register</Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? Login</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(5),
  },
  headerText: {
    fontFamily: "Gilroy-Bold",
    fontSize: totalSize(4),
  },

  formContainer: {
    marginTop: height(7),
  },
  buttonContainer: {
    marginTop: height(3),
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(5),
  },
  forgotPassword: {
    fontFamily: "SFPro-Light",
    fontSize: totalSize(2),
    marginVertical: height(1),
  },
  footerText: {
    fontFamily: "SFPro-Light",
    fontSize: totalSize(2),
  },
});
