import { createContext, useEffect, useState } from "react";
import firebase from "../config/firebase";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (values) => {
    const { email, password } = values;

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
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
