import {
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import LoadingComponent from "../../components/Loading";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import firebase, { auth, firestore } from "../../../config/firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";

import randomatic from "randomatic";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  price: Yup.number().required().min(1).label("Price"),
  description: Yup.string().required().min(10).label("Description"),
});

export default function AddScreen() {
  const toast = useToast();

  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = firestore.collection("products");

  if (loading) {
    return <LoadingComponent title="Uploading..." />;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage([...image, result.uri]);
    }
  };

  const deleteImage = (index) => {
    const newImage = image.filter((item, i) => i !== index);
    setImage(newImage);
  };

  const uploadImages = async () => {
    try {
      setLoading(true);
      const response = await Promise.all(
        image.map((item) => {
          return fetch(item);
        })
      );
      const blob = await Promise.all(
        response.map((item) => {
          return item.blob();
        })
      );
      const ref = await Promise.all(
        blob.map((item) => {
          return firebase
            .storage()
            .ref()
            .child("products/" + randomatic("Aa0", 10));
        })
      );
      const upload = await Promise.all(
        ref.map((item, i) => {
          return item.put(blob[i]);
        })
      );
      const download = await Promise.all(
        upload.map((item) => {
          return item.ref.getDownloadURL();
        })
      );
      setLoading(false);
      setImage([]);
      return download;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const timpeStamp = firebase.firestore.FieldValue.serverTimestamp;

      setLoading(true);
      const result = await db.add({
        id: randomatic("Aa0", 10),
        name: values.name,
        price: values.price,
        description: values.description,
        createdAt: timpeStamp(),
        images: await uploadImages(),
        postedBy: auth.currentUser.uid,
      });
      setLoading(false);
      toast.show("Product added successfully", {
        type: "success",
        placement: "top",
      });
    } catch (error) {
      setLoading(false);
      toast.show("Something went wrong", {
        type: "danger",
        duration: 3000,
        placement: "top",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Add Product</Text>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            name: "",
            price: "",
            description: "",
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <Input
                placeholder="Product Name"
                style={styles.input}
                placeholderTextColor={colors.grey}
                icon={<AntDesign name="book" size={20} color={colors.grey} />}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                value={values.name}
              />
              {errors.name && <ErrorText error={errors.name} />}
              <Input
                placeholder="Product Price"
                style={styles.input}
                placeholderTextColor={colors.grey}
                keyboardType="numeric"
                icon={
                  <Feather name="dollar-sign" size={20} color={colors.grey} />
                }
                onChangeText={handleChange("price")}
                onBlur={() => setFieldTouched("price")}
                value={values.price}
              />
              {errors.price && <ErrorText error={errors.price} />}
              <Input
                placeholder="Product Description"
                style={styles.input}
                placeholderTextColor={colors.grey}
                multiline
                numberOfLines={4}
                icon={<Entypo name="text" size={20} color={colors.grey} />}
                onChangeText={handleChange("description")}
                onBlur={() => setFieldTouched("description")}
                value={values.description}
              />
              {errors.description && <ErrorText error={errors.description} />}
              <View style={styles.imagesContainer}>
                {image.map(
                  (
                    img,
                    index // Loop through the images and render them to the screen
                  ) => (
                    <View key={index} style={styles.imageContainer}>
                      <Image
                        source={{ uri: img }}
                        style={styles.image}
                        key={index}
                      />

                      <MaterialCommunityIcons
                        name="delete"
                        size={18}
                        color={colors.red}
                        style={styles.deleteButton}
                        onPress={() => deleteImage(index)}
                      />
                    </View>
                  )
                )}

                {image.length < 3 && (
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.imageSelect}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      size={24}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {image.length === 3 && (
                <Text style={styles.imageLimit}>You can only add 3 images</Text>
              )}

              <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit}>Add Product</Button>
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
  imagesContainer: {
    flexDirection: "row",
    marginTop: height(2),
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: width(20),
    height: width(20),
    marginRight: width(2),
    borderRadius: width(2),
    marginVertical: height(1),
  },
  imageSelect: {
    alignItems: "center",
    justifyContent: "center",
    width: width(25),
    height: width(25),
    backgroundColor: colors.grey,
    borderRadius: width(2),
  },
  imageContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    width: totalSize(3.5),
    height: totalSize(3.5),
    position: "relative",
    right: width(5),
    backgroundColor: colors.white,
    padding: width(1),
    borderRadius: width(5),
    elevation: 5,
  },
  imageLimit: {
    color: colors.inActiveTabBarColor,
    fontSize: totalSize(1.8),
    fontFamily: "SFPro-Medium",
    textAlign: "center",
    marginTop: height(1),
  },
});
