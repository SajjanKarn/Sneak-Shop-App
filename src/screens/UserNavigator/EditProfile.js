import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, totalSize, width } from "react-native-dimension";
import colors from "../../../config/colors";
import { auth } from "../../../config/firebase";
import Button from "../../components/Button";
import Input from "../../components/Input";

import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorText from "../../components/ErrorText";
import { useToast } from "react-native-toast-notifications";
import LoadingComponent from "../../components/Loading";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(4).label("Name"),
});

export default function EditProfile() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(auth.currentUser.displayName);
  const [profileImage, setProfileImage] = useState(auth.currentUser.photoURL);

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

  const handleSubmit = async (values) => {
    if (
      values.name === auth.currentUser.displayName &&
      profileImage === auth.currentUser.photoURL
    ) {
      toast.show("No changes made", {
        type: "info",
        placement: "top",
        duration: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      await auth.currentUser.updateProfile({
        displayName: values.name,
        photoURL: profileImage,
      });
      toast.show("Profile updated successfully", {
        type: "success",
        placement: "top",
        duration: 2000,
      });
      setLoading(false);
    } catch (error) {
      toast.show(error.message, {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.profileImageContainer}
          onPress={pickImage}
        >
          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileImageHint}>
          Tap to change your profile picture
        </Text>

        <Formik
          initialValues={{ name }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <>
              <Input
                placeholder="Your Name"
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {errors.name && <ErrorText error={errors.name} />}

              <Button onPress={handleSubmit} marginTop={height(2)}>
                Save Changes
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
    paddingVertical: height(5),
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    height: totalSize(13),
    width: totalSize(13),
    borderRadius: totalSize(13) / 2,
    backgroundColor: colors.inActiveTabBarColor,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
  profileImageHint: {
    fontSize: totalSize(1.5),
    color: colors.inActiveTabBarColor,
    marginTop: height(1),
    fontFamily: "SFPro-Regular",
  },
});
