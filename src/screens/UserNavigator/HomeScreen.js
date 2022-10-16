import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import { AntDesign, Feather } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerUserCartContainer}>
        <Feather name="align-left" size={25} color={colors.primary} />
        <AntDesign name="shoppingcart" size={25} color={colors.primary} />
      </View>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInput}>
          <SearchInput />
        </View>
        <View style={styles.filterIcon}>
          <AntDesign name="filter" size={25} color={colors.primary} />
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
  headerUserCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height(2),
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(2),
  },
  searchInput: {
    flex: 1,
  },
  filterIcon: {
    padding: height(1.5),
    borderRadius: totalSize(0.5),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width(2),
    borderWidth: 1.3,
    borderColor: "#E6E6E6",
  },
});
