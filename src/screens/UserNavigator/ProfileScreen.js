import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../../../config/colors";

const Setting = ({
  title = "Setting",
  icon = <AntDesign name="user" size={25} color={colors.primary} />,
}) => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.settingContainer}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userProfileContainer}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg",
          }}
          style={styles.userProfileImage}
        />
        <Text style={styles.userProfileName}>Samantha Smith</Text>
      </View>
      <View style={styles.userSettings}>
        <Text style={styles.userSettingsText}>Settings</Text>

        <View style={styles.userSettingsContainer}>
          <Setting title="Edit Profile" />
          <Setting
            icon={<AntDesign name="lock" size={25} color={colors.primary} />}
            title="Change Password"
          />
          <Setting
            icon={<AntDesign name="logout" size={25} color={colors.primary} />}
            title="Logout"
          />
        </View>
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
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height(2),
    marginVertical: height(1),
  },
  title: {
    fontSize: totalSize(2),
    fontFamily: "Gilroy-Regular",
    paddingLeft: width(5),
  },
  userProfileContainer: {
    marginTop: height(3),
    alignItems: "center",
    resizeMode: "contain",
  },
  userProfileImage: {
    width: width(30),
    height: width(30),
    borderRadius: width(15),
  },
  userProfileName: {
    fontSize: totalSize(3),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
    marginTop: height(2),
  },

  userSettings: {
    marginTop: height(5),
  },
  userSettingsText: {
    fontSize: totalSize(2.5),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
  },
  userSettingsContainer: {
    marginTop: height(3),
    paddingHorizontal: width(3),
  },
});
