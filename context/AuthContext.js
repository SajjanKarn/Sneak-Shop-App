import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import colors from "../config/colors";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      if (!result.user.emailVerified) {
        toast.show("Please verify your email address", {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
        return;
      }

      setUser(result.user);
      toast.show("Login Successful", {
        type: "success",
        placement: "top",
        duration: 1500,
      });
    } catch (error) {
      toast.show("Invalid email or password", {
        type: "danger",
        placement: "top",
        duration: 1500,
      });
    }
  };

  const register = async (values) => {
    const { email, password } = values;

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.updateProfile({
        displayName: values.name,
      });
      await auth.currentUser.sendEmailVerification();

      navigation.navigate("Login");

      toast.show("Register success, Check your email for verification", {
        type: "success",
        placement: "top",
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      toast.show("Logout Successful", {
        type: "success",
        placement: "top",
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
