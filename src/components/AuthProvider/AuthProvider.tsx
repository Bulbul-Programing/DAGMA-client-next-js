"use client";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import app from "../firebaseInfo";

export const authContext = createContext<any | null>(null);

const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const emailRegistration = (email: string, password: string) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailLogin = (email: string, password: string) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      return () => {
        unSubscribe();
      };
    });
  }, [user]);

  const authInfo = {
    user,
    setUser,
    loading,
    emailRegistration,
    emailLogin,
    googleLogin,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
