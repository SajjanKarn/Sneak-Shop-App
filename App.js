import { useContext, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import colors from "./config/colors";
import { height, totalSize, width } from "react-native-dimension";

import HomeScreen from "./src/screens/UserNavigator/HomeScreen";
import SearchScreen from "./src/screens/UserNavigator/SearchScreen";
import AddScreen from "./src/screens/UserNavigator/AddScreen";
import ProfileScreen from "./src/screens/UserNavigator/ProfileScreen";
import ProductDetails from "./src/screens/UserNavigator/ProductDetails";

import AddButton from "./src/components/TabBarAddButton";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
          tabBarBadge: 3,
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
  </Stack.Navigator>
);

const AuthRenderer = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <UserAuthNavigator />;
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
    <AuthContextProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <AuthRenderer />
        </View>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
