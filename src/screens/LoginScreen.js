import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Input from "../components/Input";

import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/colors";
import Button from "../components/Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { Formik } from "formik";
import * as yup from "yup";
import ErrorText from "../components/ErrorText";

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            login(values.email, values.password);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <Input
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {errors.email && <ErrorText error={errors.email} />}
              <Input
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                placeholder="Your password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                value={values.password}
              />
              {errors.password && <ErrorText error={errors.password} />}

              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit}>Login</Button>
              </View>
            </>
          )}
        </Formik>
      </View>

      <View style={styles.footer}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Text
          style={styles.footerText}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.white,
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
