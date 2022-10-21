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
import { firestore } from "../../../config/firebase";

import { FlashList } from "@shopify/flash-list";

import { useEffect, useState } from "react";
import LoadingComponent from "../../components/Loading";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const dbRef = firestore.collection("products");

  const handleSnapShotChange = (querySnapshot) => {
    setLoading(true);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    setProduct(products);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = dbRef
      .orderBy("createdAt", "desc")
      .onSnapshot(handleSnapShotChange);
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    const unsubscribe = dbRef
      .orderBy("createdAt", "desc")
      .onSnapshot(handleSnapShotChange);
    setRefreshing(false);
    return unsubscribe;
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={colors.primary}
          colors={[colors.white]}
          progressViewOffset={80}
        />
      }
      showsVerticalScrollIndicator={false}
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
          {product.length === 0 && (
            <View style={styles.noProductsContainer}>
              <Text style={styles.noProductsText}>No Products</Text>
            </View>
          )}

          {product.length > 0 && (
            <FlashList
              data={product}
              renderItem={({ item, index }) => (
                <Product
                  key={index}
                  image={item.images[0]}
                  title={item.name}
                  price={item.price}
                  id={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: totalSize(5),
              }}
              estimatedItemSize={261}
            />
          )}
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
  noProductsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: totalSize(2),
    fontFamily: "SFPro-Medium",
    color: colors.primary,
  },
});
