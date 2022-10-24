import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import LoadingComponent from "../../components/Loading";

import { Formik } from "formik";
import * as Yup from "yup";

import firebase from "../../../config/firebase";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().min(6).label("Current Password"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

export default function ChangePassword() {
  const toast = useToast();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingComponent />;
  }

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        values.currentPassword
      );

      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(values.password);

      setLoading(false);
      toast.show("Password changed successfully", {
        type: "success",
        placement: "top",
        duration: 2000,
      });
      navigation.goBack();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.show("Wrong current password", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      } else {
        toast.show("Something went wrong", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }

      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Change Password</Text>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, setFieldTouched }) => (
            <>
              <Input
                placeholder="Current Password"
                style={styles.input}
                placeholderTextColor={colors.grey}
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                secureTextEntry
                onChangeText={handleChange("currentPassword")}
                onBlur={() => setFieldTouched("currentPassword")}
              />
              {errors.currentPassword && (
                <ErrorText error={errors.currentPassword} />
              )}

              <Input
                placeholder="New Password"
                style={styles.input}
                placeholderTextColor={colors.grey}
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {errors.password && <ErrorText error={errors.password} />}

              <Input
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor={colors.grey}
                icon={<AntDesign name="lock" size={20} color={colors.grey} />}
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorText error={errors.confirmPassword} />
              )}
              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit}>Change Password</Button>
              </View>
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
