import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useToast } from "react-native-toast-notifications";
import colors from "../../../config/colors";
import { firestore } from "../../../config/firebase";
import Product from "../../components/Product";
import SearchInput from "../../components/SearchInput";

export default function SearchScreen() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (search) => {
    try {
      setLoading(true);
      if (!search) {
        toast.show("Please enter a search term", {
          type: "danger",
          placement: "top",
          duration: 1500,
        });
        setLoading(false);
        return;
      }
      const searchProducts = await firestore
        .collection("products")
        .where("name", ">=", search)
        .where("name", "<=", search + "\uf8ff")
        .get();
      const productsArray = [];
      searchProducts.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <SearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={() => handleSearch(search)}
        />
      </View>

      <View style={styles.productsContainer}>
        {products.length > 0 && (
          <>
            <FlashList
              data={products}
              renderItem={({ item }) => (
                <Product
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]}
                  id={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.contentContainer}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No products found</Text>
              )}
              ListFooterComponent={() => (
                <Text style={styles.emptyText}>No more products</Text>
              )}
              onEndReachedThreshold={0.5}
              estimatedItemSize={180}
              onEndReached={() => console.log("end reached")}
              refreshing={loading}
              onRefresh={() => handleSearch(search)}
            />
          </>
        )}
        {products.length === 0 && (
          <Text style={styles.emptyText}>No products found</Text>
        )}
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
  searchInputContainer: {
    marginTop: height(2),
  },
  productsContainer: {
    width: "100%",
    height: "100%",
    marginTop: height(2),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingBottom: height(5),
  },
  emptyText: {
    textAlign: "center",
    fontSize: totalSize(2),
    color: colors.grey,
  },
  emptyText: {
    textAlign: "center",
    fontSize: totalSize(2),
    color: colors.grey,
    fontFamily: "SFPro-Medium",
  },
});
