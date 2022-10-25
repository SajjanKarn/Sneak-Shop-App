import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { auth } from "../config/firebase";
import LoadingComponent from "../src/components/Loading";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setUser(user);
        setLoading(false);
      }
    });

    setLoading(false);
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      if (!result.user.emailVerified) {
        toast.show("Please verify your email address", {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
        setLoading(false);
        return;
      }

      setUser(result.user);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const register = async (values, url) => {
    const { email, password } = values;

    try {
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.updateProfile({
        displayName: values.name,
        photoURL: url,
      });
      await auth.currentUser.sendEmailVerification();
      setLoading(false);

      navigation.navigate("Login");

      toast.show("Register success, Check your email for verification", {
        type: "success",
        placement: "top",
        duration: 1500,
      });
    } catch (error) {
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setUser(null);
      setLoading(false);
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
      {loading ? <LoadingComponent /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
