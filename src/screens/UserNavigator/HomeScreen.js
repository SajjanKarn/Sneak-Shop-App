import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

import { AntDesign, Feather } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";
import FilterTabs from "../../components/FilterTabs";
import Product from "../../components/Product";

import { FlashList } from "@shopify/flash-list";

import { useState } from "react";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [product, setProduct] = useState([
    {
      uri: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Nike Air Max 270",
      price: 100,
    },
    {
      uri: "https://images.pexels.com/photos/6153747/pexels-photo-6153747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "New Balance 997",
      price: 120,
    },
    {
      uri: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Adidas Yeezy Boost 350",
      price: 150,
    },
    {
      uri: "https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Nike jordan 1",
      price: 200,
    },
    {
      uri: "https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Reebok Club C",
      price: 80,
    },
    {
      uri: "https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Converse Chuck Taylor",
      price: 60,
    },
    {
      uri: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Jordan 1 Retro High",
      price: 200,
    },
    {
      uri: "https://images.pexels.com/photos/1123985/pexels-photo-1123985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "ADIDAS YEEZY BOOST 350 V2",
      price: 150,
    },
    {
      uri: "https://images.pexels.com/photos/1895019/pexels-photo-1895019.jpeg",
      title: "Nike jordan tarvis",
      price: 500,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          progressBackgroundColor={colors.primary}
          colors={[colors.white]}
          progressViewOffset={80}
        />
      }
    >
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

        <View style={styles.newArrivalsProductsContainer}>
          <FlashList
            data={product}
            renderItem={({ item, index }) => (
              <Product
                key={index}
                image={item.uri}
                title={item.title}
                price={item.price}
              />
            )}
            keyExtractor={(item) => item.title}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: totalSize(5),
            }}
            estimatedItemSize={261}
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
    marginBottom: height(5),
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

  newArrivalsProductsContainer: {
    width: "100%",
    height: "100%",
    marginTop: height(3),
    marginHorizontal: width(2),
    overflow: "hidden",
  },
});
