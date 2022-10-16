import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import { AntDesign, Feather } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";
import FilterTabs from "../../components/FilterTabs";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* ======= header ======= */}
      <View style={styles.headerUserCartContainer}>
        <Feather name="align-left" size={25} color={colors.primary} />
        <AntDesign name="shoppingcart" size={25} color={colors.primary} />
      </View>

      {/* ====== SearchInput ====== */}
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInput}>
          <SearchInput />
        </View>
        <View style={styles.filterIcon}>
          <AntDesign name="filter" size={25} color={colors.primary} />
        </View>
      </View>

      {/* ====== filter tabs =====  */}
      <View style={styles.filterTabsContainer}>
        <FilterTabs />
      </View>

      {/* ====== new arrivals ====== */}
      <View style={styles.newArrivalsContainer}>
        <View style={styles.newArrivalsHeader}>
          <Text style={styles.newArrivalsHeaderText}>New Arrivals</Text>
          <Text style={styles.newArrivalsHeaderSeeAll}>See All</Text>
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

  // search section
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

  // new arrivals
  newArrivalsContainer: {
    marginTop: height(4),
  },
  newArrivalsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newArrivalsHeaderText: {
    fontSize: totalSize(3),
    fontFamily: "Gilroy-Bold",
    color: colors.primary,
  },
  newArrivalsHeaderSeeAll: {
    fontSize: totalSize(1.8),
    fontFamily: "SFPro-Medium",
    color: colors.primary,
    textDecorationLine: "underline",
    textDecorationColor: colors.primary,
  },
});
