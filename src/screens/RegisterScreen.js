import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import Input from "../components/Input";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Button from "../components/Button";

import { Formik } from "formik";
import * as yup from "yup";
import ErrorText from "../components/ErrorText";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../config/firebase";
import { useToast } from "react-native-toast-notifications";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(4).label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const toast = useToast();

  const [profileImage, setProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(profileImage);
    const blob = await response.blob();
    const fileName = profileImage.substring(profileImage.lastIndexOf("/") + 1);
    const ref = storage
      .ref()
      .child("profileImages/" + fileName)
      .put(blob);

    try {
      await ref;

      const url = await storage
        .ref("profileImages")
        .child(fileName)
        .getDownloadURL();

      setProfileUrl(url);
      setUploading(false);
      return url;
    } catch (error) {
      console.log("Something went wrong", error);
      toast.show("Something went wrong, please try again later", {
        type: "danger",
        placement: "top",
      });
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            if (profileImage) {
              const url = await uploadImage();
              register(values, url);
            } else {
              alert("Please select a profile image");
            }
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
              {profileImage === null && (
                <>
                  <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={pickImage}
                  >
                    <MaterialIcons
                      name="add-a-photo"
                      size={24}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={styles.imageText}>Add Profile Image</Text>
                </>
              )}

              {profileImage && (
                <TouchableOpacity onPress={pickImage}>
                  <Image source={{ uri: profileImage }} style={styles.image} />
                </TouchableOpacity>
              )}
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
                <Button onPress={handleSubmit} loading={uploading}>
                  Register
                </Button>
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
    marginTop: height(1),
  },
  headerText: {
    fontFamily: "Gilroy-Bold",
    fontSize: totalSize(4),
  },

  formContainer: {
    marginTop: height(2),
  },
  imageContainer: {
    width: totalSize(13),
    height: totalSize(13),
    borderRadius: totalSize(10),
    backgroundColor: colors.inActiveTabBarColor,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height(1),
  },
  imageText: {
    fontFamily: "Gilroy-Bold",
    fontSize: totalSize(1.5),
    color: colors.grey,
    alignSelf: "center",
    marginBottom: height(1),
  },
  image: {
    width: totalSize(13),
    height: totalSize(13),
    borderRadius: totalSize(10),
    alignSelf: "center",
    marginBottom: height(1),
  },

  buttonContainer: {
    marginTop: height(3),
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(3),
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
