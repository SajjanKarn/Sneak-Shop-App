import { useContext, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "./config/colors";
import { height, totalSize, width } from "react-native-dimension";

import HomeScreen from "./src/screens/UserNavigator/HomeScreen";
import SearchScreen from "./src/screens/UserNavigator/SearchScreen";
import AddScreen from "./src/screens/UserNavigator/AddScreen";
import ProfileScreen from "./src/screens/UserNavigator/ProfileScreen";
import ProductDetails from "./src/screens/UserNavigator/ProductDetails";

import AddButton from "./src/components/TabBarAddButton";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";
import ChangePassword from "./src/screens/UserNavigator/ChangePassword";
import CartScreen from "./src/screens/UserNavigator/CartScreen";
import CartContext, { CartContextProvider } from "./context/CartContext";
import ForgotPassword from "./src/screens/ForgotPassword";
import EditProfile from "./src/screens/UserNavigator/EditProfile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const { cart } = useContext(CartContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inActiveTabBarColor,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: height(8),
          borderRadius: totalSize(1),
          position: "absolute",
          bottom: height(2),
          marginHorizontal: totalSize(2),
          elevation: 2,
        },
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" color={color} size={size} />
          ),
          tabBarButton: (props) => <AddButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: "Your Cart",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: totalSize(2.5),
            fontFamily: "Gilroy-Bold",
          },
          headerLeft: () => {
            // back button

            return (
              <AntDesign
                name="arrowleft"
                size={totalSize(2.5)}
                color={colors.primary}
                style={{ marginLeft: totalSize(2) }}
                onPress={() => navigation.goBack()}
              />
            );
          },
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
          tabBarBadge: cart.length,
          tabBarBadgeStyle: {
            color: colors.white,
            fontSize: totalSize(1.3),
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const UserAuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "Edit Profile",
          headerTitleStyle: {
            color: colors.primary,
            fontSize: totalSize(2.5),
            fontFamily: "Gilroy-Bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        headerTitle: "Forgot Password",
        headerTitleStyle: {
          color: colors.primary,
          fontSize: totalSize(2.2),
          fontFamily: "Gilroy-Bold",
        },
      }}
    />
  </Stack.Navigator>
);

const AuthRenderer = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <CartContextProvider>
        <UserAuthNavigator />
      </CartContextProvider>
    );
  } else {
    return <AuthNavigator />;
  }
};

export default function App() {
  let [fontsLoaded] = useFonts({
    "SFPro-Light": require("./assets/fonts/SFPRODISPLAY-LIGHT.ttf"),
    "SFPro-Regular": require("./assets/fonts/SFPRODISPLAY-REGULAR.ttf"),
    "SFPro-Medium": require("./assets/fonts/SFPRODISPLAY-MEDIUM.ttf"),
    "SFPro-Bold": require("./assets/fonts/SFPRODISPLAY-BOLD.ttf"),
    "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "SFPro-Semibold": require("./assets/fonts/SFPRODISPLAY-SEMIBOLD.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-Heavy": require("./assets/fonts/Gilroy-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ToastProvider>
        <NavigationContainer>
          <AuthContextProvider>
            <AuthRenderer />
          </AuthContextProvider>
        </NavigationContainer>
      </ToastProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
