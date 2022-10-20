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
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import Input from "../../components/Input";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function AddScreen() {
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage([...image, result.uri]);
    }
  };

  const deleteImage = (index) => {
    const newImage = image.filter((item, i) => i !== index);
    setImage(newImage);
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.imagesContainer}>
        {image.map(
          (
            img,
            index // Loop through the images and render them to the screen
          ) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: img }} style={styles.image} key={index} />

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
          <TouchableOpacity onPress={pickImage} style={styles.imageSelect}>
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
        <Button>Add Product</Button>
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
    width: width(8),
    height: width(8),
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
