import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Input from "../components/Input";

import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/colors";
import Button from "../components/Button";

import { Formik } from "formik";
import * as yup from "yup";
import ErrorText from "../components/ErrorText";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(4).label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .min(4)
    .label("Confirm Password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            register(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <Input
                placeholder="Sajjan Karna"
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                value={values.name}
              />
              {touched.name && errors.name && <ErrorText error={errors.name} />}
              <Input
                placeholder="abc@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <ErrorText error={errors.email} />
              )}
              <Input
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <ErrorText error={errors.password} />
              )}
              <Input
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                placeholder="Confirm Password"
                keyboardType="default"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <ErrorText error={errors.confirmPassword} />
              )}

              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit}>Register</Button>
              </View>
            </>
          )}
        </Formik>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText} onPress={() => navigation.goBack()}>
          Already have an account? Login
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
