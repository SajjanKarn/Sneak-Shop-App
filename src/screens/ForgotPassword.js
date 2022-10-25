import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Lottie from "lottie-react-native";

import colors from "../../config/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import LoadingComponent from "../components/Loading";

import { Formik } from "formik";
import * as Yup from "yup";

import firebase from "../../config/firebase";
import { useToast } from "react-native-toast-notifications";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await firebase.auth().sendPasswordResetEmail(values.email);
      toast.show("Password reset email sent", {
        type: "success",
        placement: "top",
        duration: 3000,
      });
      setLoading(false);
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Forgot Password ?</Text>

      <View style={styles.animationContainer}>
        <Lottie
          autoPlay
          loop
          source={require("../../assets/animations/forgot-password.json")}
        />
      </View>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <Input
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<AntDesign name="mail" size={20} color={colors.grey} />}
                style={styles.input}
                inputStyle={styles.inputText}
                onChangeText={handleChange("email")}
              />
              {errors.email && <ErrorText error={errors.email} />}

              <Button
                marginTop={height(2)}
                onPress={handleSubmit}
                style={styles.button}
              >
                Send Reset Link
              </Button>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width(5),
    paddingVertical: height(2),
  },
  screenTitle: {
    fontFamily: "Gilroy-Bold",
    fontSize: totalSize(2.8),
  },
  animationContainer: {
    width: width(90),
    height: height(30),
    justifyContent: "center",
    alignItems: "center",
  },
});
